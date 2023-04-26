import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';

import * as authApiTeacher from '@api/teacher/auth.api';
import * as authApiAdmin from '@api/admin/auth.api';

import { Login, LoginResponse } from '@interfaces/teacher/Auth.interface';

const useLogin = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState<LoginResponse | null>(null);

	const login = useCallback(
		async (fields: Login, role: 'teacher' | 'admin' = 'teacher') => {
			setLoading(true);
			try {
				const data =
					role === 'teacher'
						? await authApiTeacher.login(fields)
						: await authApiAdmin.login(fields);
				setLoading(false);
				setData(data);
				authStorage.setAccessToken(data.token);
				return data;
			} catch (err) {
				setLoading(false);
				switch ((err as any).response.status) {
					case 400:
						setError('Usuario o contraseña incorrectos');
						break;
					case 403:
						setError('Usuario o contraseña incorrectos');
						break;
					default:
						setError('Un error ha ocurrido');
						break;
				}
				throw err;
			}
		},
		[]
	);

	return { loading, error, data, setData, login };
};

export default useLogin;
