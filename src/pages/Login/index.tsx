import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {useTranslation} from 'react-i18next'
import 'react-toastify/dist/ReactToastify.css';

import useAuthStorage from '@hooks/useAuthStorage';
import useLogin from '@hooks/useLogin';

import { validToken } from '@utils/auth';

import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import LoginForm from '@pages/Login/components/LoginForm';

import Logo from '@icons/Logo.svg';
import { Role } from '@enums/Role.enum';

const INITIAL_STATE = {
	username: '',
	password: ''
};

function Login() {
	const { loading, login } = useLogin();
	const [form, setForm] = useState(INITIAL_STATE);
	const authStorage = useAuthStorage();
	const tokenPayload = validToken(authStorage.getAccessToken());
	const {t} = useTranslation()

	const VALIDATION = {
		username: (value: string) => !value && t('login.error.username'),
		password: (value: string) => !value && t('login.error.password')
	};

	if (tokenPayload) {
		const { role } = tokenPayload;
		if (Object.values(Role).includes(role)) {
			return <Navigate to={`/${role}/home`}></Navigate>;
		} else {
			authStorage.removeAccessToken();
		}
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
			toast.error(usernameError);
			return;
		}

		if (passwordError) {
			toast.error(passwordError);
			return;
		}

		login({ username, password }, Role.TEACHER)
			.catch(() => login({ username, password }, Role.ADMIN))
			.catch(() => toast.error(t('login.error.message')));
	};

	return (
		<div>
			<ToastContainer />
			<div className="flex min-h-screen flex-col justify-between">
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
			</div>
		</div>
	);
}

export default Login;
