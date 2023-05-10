import { environment } from '@environments/environment';
import { TaskAttemptSubmissionDetail } from '@interfaces/teacher/TaskAttempt.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function getTaskAttempts({
	idCourse,
	token
}: {
	idCourse: number;
	token: string;
}): Promise<TaskAttemptSubmissionDetail[]> {
	const response = await axios.get(
		`${apiTeacherUrl}/courses/${idCourse}/taskAttempts`,
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

export async function getTaskAttempt({
	idCourse,
	idTaskAttempt,
	token
}: {
	idCourse: number;
	idTaskAttempt: number;
	token: string;
}): Promise<TaskAttemptSubmissionDetail> {
	const response = await axios.get(
		`${apiTeacherUrl}/courses/${idCourse}/taskAttempts/${idTaskAttempt}`,
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
