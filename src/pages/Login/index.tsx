import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';

import { useAlertContext } from '@hooks/useAlertContext';
import useAuthStorage from '@hooks/useAuthStorage';
import useLogin from '@hooks/useLogin';

import { validToken } from '@utils/auth';

import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

import Logo from '@icons/Logo.svg';
import LoginForm from './components/LoginForm';
import { Role } from '@enums/Role.enum';

const INITIAL_STATE = {
	username: '',
	password: ''
};

const VALIDATION = {
	username: (value: string) => !value && 'El usuario es requerido',
	password: (value: string) => !value && 'La contraseña es requerida'
};

function Login() {
	const { loading, login } = useLogin();
	const { handleAlert } = useAlertContext();
	const [form, setForm] = useState(INITIAL_STATE);

	const authStorage = useAuthStorage();

	const tokenPayload = validToken(authStorage.getAccessToken());
	if (tokenPayload) {
		// if (tokenPayload || (data && !error)) {
		const { role } = tokenPayload;
		return <Navigate to={`/${role}/home`}></Navigate>;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

		login({ username, password }, Role.TEACHER)
			.catch(() => login({ username, password }, Role.ADMIN))
			.catch(() =>
				handleAlert('Usuario o contraseña incorrectos', 'error')
			);
	};

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
						<LoginForm
							form={form}
							loading={loading}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Login;
