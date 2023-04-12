import { isExpired, decodeToken } from 'react-jwt';

export function validToken(token: string | null): boolean {
	if (!token) return false;
	const { exp } = decodeToken(token) as { exp: number };
	if (exp === undefined) return true; // No expiration date
	return !isExpired(token);
}
