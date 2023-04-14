import { TeamMember } from './Student.interface';

export interface TeamDetail {
	id: number;
	code: string;
	name: string;
	students: TeamMember[];
	active: boolean;
	taskOrder: number | null;
	playing: boolean;
}
