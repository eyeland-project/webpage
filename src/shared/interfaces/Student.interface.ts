import { Power } from '@enums/Team.enum';

export interface TeamMember {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	power: Power | null;
}
