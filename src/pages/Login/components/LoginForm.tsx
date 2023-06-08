import {useTranslation} from 'react-i18next'

import Loading from 'react-loading';

import { Login } from '@interfaces/teacher/Auth.interface';

function LoginForm({
	form,
	loading,
	handleChange,
	handleSubmit
}: {
	form: Login;
	loading: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {

	const {t} = useTranslation()

	return (
		<>
			<h2 className="text-center text-2xl mt-6">{t('login.title')}</h2>
			<form onSubmit={handleSubmit} className="my-5 w-full">
				<div className="w-full">
					<label htmlFor="username">{t('login.username')}</label>
					<input
						type="username"
						name="username"
						id="login-teacher-form-username"
						value={form.username}
						onChange={handleChange}
					/>
				</div>
				<div className="mt-5">
					<label htmlFor="password">{t('login.password')}</label>
					<input
						type="password"
						name="password"
						id="login-teacher-form-password"
						value={form.password}
						onChange={handleChange}
					/>
				</div>
				<button
					className="button mt-5 w-full bg-green-primary text-white"
					type="submit"
				>
					{loading ? (
						<Loading
							type="spin"
							color="white"
							height={20}
							width={20}
						/>
					) : (
						<>{t('login.login')}</>
					)}
				</button>
			</form>
		</>
	);
}

export default LoginForm;
