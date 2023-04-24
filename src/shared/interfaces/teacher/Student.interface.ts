export interface StudentSummary {
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

interface VisualDisease {
	id: number;
	code: string;
	name: string;
}

export interface StudentDetail extends StudentSummary {
	blindnessAcuity: VisualDisease;
	visualFieldDefect: VisualDisease;
	colorDeficiency: VisualDisease;
}

export interface StudentCreate {
	// idCourse: number; // since the route is /courses/:idCourse/students, this is not needed
	idBlindnessAcuity: number;
	idVisualFieldDefect: number;
	idColorDeficiency: number;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email: string;
	phoneCode: string;
	phoneNumber: string;
}

export type StudentUpdate = Partial<StudentCreate>;
