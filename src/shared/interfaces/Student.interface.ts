export interface StudentDetail {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	phone: string;
	blindnessAcuity: {
		name: string;
		level: number;
		description: string;
	};
	colorDeficiency: {
		name: string;
		
	}
}
export interface StudentSummary {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	phone: string;
	blindnessAcuity: {
		name: string;
		level: number;
	};
}
