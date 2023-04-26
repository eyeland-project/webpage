import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useAlertContext } from '@hooks/useAlertContext';
import useAuthStorage from '@hooks/useAuthStorage';
import useLogin from '@hooks/useLogin';

import { validToken } from '@utils/auth';

import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

import Logo from '@icons/Logo.svg';
import LoginForm from './components/LoginForm';

const INITIAL_STATE = {
	username: '',
	password: ''
};

const VALIDATION = {
	username: (value: string) => !value && 'El usuario es requerido',
	password: (value: string) => !value && 'La contraseña es requerida'
};

function Login() {
	const { loading, error, data, login } = useLogin();
	const { handleAlert } = useAlertContext();
	const [form, setForm] = useState(INITIAL_STATE);
	const [selectedTab, setSelectedTab] = useState(0);

	const authStorage = useAuthStorage();

	if (validToken(authStorage.getAccessToken()) || (data && !error)) {
		return <Navigate to={'/teacher/home'}></Navigate>;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { username, password } = form;
		const usernameError = VALIDATION.username(username);
		const passwordError = VALIDATION.password(password);
		if (usernameError) {
			handleAlert(usernameError, 'error');
			return;
		}
		if (passwordError) {
			handleAlert(passwordError, 'error');
			return;
		}
		await login(
			{ username, password },
			selectedTab === 0 ? 'teacher' : 'admin'
		);
	};

	const onTabSelect = (index: number, lastIndex: number) => {
		if (index === lastIndex) return;
		setSelectedTab(index);
		setForm(INITIAL_STATE);
	};

	if (error) {
		handleAlert(error, 'error');
	}

	return (
		<>
			<NavBar showTeacherButton={false} />
			<div className="flex w-auto flex-col items-center justify-center">
				<div className="relative w-fit">
					<img
						src={Logo}
						alt="Logo"
						className="absolute -top-24 -right-48 w-96"
					/>
					<div className="card relative flex w-96 flex-col items-stretch justify-center">
						<Tabs
							onSelect={onTabSelect}
							selectedIndex={selectedTab}
						>
							<TabList>
								<Tab>Profesor</Tab>
								<Tab>Administrador</Tab>
							</TabList>
							<TabPanel>
								<LoginForm
									form={form}
									loading={loading}
									handleChange={handleChange}
									handleSubmit={handleSubmit}
								/>
							</TabPanel>
							<TabPanel>
								<LoginForm
									form={form}
									loading={loading}
									handleChange={handleChange}
									handleSubmit={handleSubmit}
								/>
							</TabPanel>
						</Tabs>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Login;
