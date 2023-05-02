import { TokenPayload } from '@interfaces/teacher/Auth.interface';
import { isExpired, decodeToken as decode } from 'react-jwt';

export function validToken(token: string | null): TokenPayload | null {
	if (!token) return null;
	const decoded = decodeToken(token);
	if (!decoded) return null;
	if (decoded.exp === undefined) return decoded; // No expiration date
	return !isExpired(token) ? decoded : null;
}

export function decodeToken(token: string | null): TokenPayload | null {
	if (!token) return null;
	return decode<TokenPayload>(token);
}
