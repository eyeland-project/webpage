import { useState, useCallback, useEffect } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';
import { useAlertContext } from './useAlertContext';

import * as authApiTeacher from '@api/teacher/auth.api';
import * as authApiAdmin from '@api/admin/auth.api';

import { Login, LoginResponse } from '@interfaces/teacher/Auth.interface';

const useLogin = () => {
	const authStorage = useAuthStorage();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState<LoginResponse | null>(null);
	const { handleAlert } = useAlertContext();

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
					case 401:
						handleError('Usuario o contraseña incorrectos');
						break;
					default:
						handleError('Error al iniciar sesión');
						break;
				}
				throw err;
			}
		},
		[]
	);

	const handleError = (error: string) => {
		setError(error);
		handleAlert(error, 'error');
	}

	return { loading, error, data, setData, login };
};

export default useLogin;
