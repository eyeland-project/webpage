export interface Login {
	username: string;
	password: string;
}

export interface LoginResponse {
	token: string;
}

export interface TokenPayload {
	id: number;
	iat: number;
	// role: string;
	exp?: number;
}

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	phone: {
		countryCode: string;
		number: string;
	};
}
