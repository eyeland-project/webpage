export interface StudentSummary {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string | null;
	phone: {
		countryCode: string | null;
		number: string;
	} | null;
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
	blindnessAcuityCode: string;
	visualFieldDefectCode: string;
	colorDeficiencyCode: string;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email: string | null;
	phoneCode: string | null;
	phoneNumber: string | null;
}

export type StudentUpdate = Partial<StudentCreate>;
