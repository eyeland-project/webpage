import { Power } from '@enums/Team.enum';

export interface TeamDetail {
	id: number;
	code: string;
	name: string;
	students: TeamMember[];
	active: boolean;
	taskOrder: number | null;
	playing: boolean;
}

export interface TeamMember {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	power: Power | null;
}

export interface TeamLeaderboardDetail {
	id: number;
	name: string;
	position: number;
}
