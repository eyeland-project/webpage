import { TeamMember } from '@interfaces/Student.interface';

export function parseStudentName(firstName: string, lastName: string): string {
	return `${firstName.split(' ')[0]} ${lastName.split(' ')[0]}`;
}
