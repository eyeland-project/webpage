import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';

import * as authApiTeacher from '@api/teacher/auth.api';
import * as authApiAdmin from '@api/admin/auth.api';

import { Login, LoginResponse } from '@interfaces/teacher/Auth.interface';
import { Role } from '@enums/Role.enum';

const useLogin = () => {
	const authStorage = useAuthStorage();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState<LoginResponse | null>(null);

	const login = useCallback(
		async (fields: Login, role: Role = Role.TEACHER) => {
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
						setError('Usuario o contraseña incorrectos');
						break;
					default:
						setError('Error al iniciar sesión');
						break;
				}
				throw err;
			}
		},
		[]
	);

	// const handleError = (error: string) => {
	// 	handleAlert(error, 'error');
	// };

	return { loading, error, data, setData, login };
};

export default useLogin;
