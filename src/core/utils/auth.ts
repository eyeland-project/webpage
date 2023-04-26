import { TokenPayload } from '@interfaces/teacher/Auth.interface';
import { isExpired, decodeToken as decode } from 'react-jwt';

export function validToken(token: string | null): boolean {
	if (!token) return false;
	const decoded = decodeToken(token);
	if (!decoded) return false;
	if (decoded.exp === undefined) return true; // No expiration date
	return !isExpired(token);
}

export function decodeToken(token: string | null): TokenPayload | null {
	if (!token) return null;
	return decode<TokenPayload>(token);
}
