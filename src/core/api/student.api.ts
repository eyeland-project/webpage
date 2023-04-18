import { environment } from '@environments/environment';
import { StudentDetail, StudentSummary } from '@interfaces/Student.interface';
import axios from 'axios';

const { apiUrl } = environment;

export async function getStudents({
	token
}: {
	token: string;
}): Promise<StudentSummary[]> {
	const response = await axios.get(`${apiUrl}/students`, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function getStudent({
	idStudent,
	token
}: {
	idStudent: number;
	token: string;
}): Promise<StudentDetail> {
	const response = await axios.get(`${apiUrl}/students/${idStudent}`, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}
