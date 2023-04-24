import axios from 'axios';
import { environment } from '@environments/environment';
import { TeamDetail } from '@interfaces/teacher/Team.interface';

const { apiTeacherUrl } = environment;

export async function getTeams({
	idCourse,
	token
}: {
	idCourse: number;
	token: string;
}): Promise<TeamDetail[]> {
	const response = await axios.get(
		`${apiTeacherUrl}/courses/${idCourse}/teams`,
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function getTeam({
	idCourse,
	idTeam,
	token
}: {
	idCourse: number;
	idTeam: number;
	token: string;
}): Promise<TeamDetail> {
	const response = await axios.get(
		`${apiTeacherUrl}/courses/${idCourse}/teams/${idTeam}`,
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function generateTeams({
	idCourse,
	token
}: {
	idCourse: number;
	token: string;
}): Promise<{ message: string }> {
	const response = await axios.post(
		`${environment.apiTeacherUrl}/courses/${idCourse}/teams/init`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			},
			timeout: 10000
		}
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}
