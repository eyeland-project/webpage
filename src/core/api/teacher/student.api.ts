import axios from 'axios';
import { environment } from '@environments/environment';
import {
	StudentCreate,
	StudentDetail,
	StudentSummary,
	StudentUpdate
} from '@interfaces/teacher/Student.interface';

const { apiTeacherUrl } = environment;

export async function getStudents({
	idCourse,
	token
}: {
	idCourse: number;
	token: string;
}): Promise<StudentSummary[]> {
	const response = await axios.get(
		`${apiTeacherUrl}/courses/${idCourse}/students`,
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

export async function getStudent({
	idCourse,
	idStudent,
	token
}: {
	idCourse: number;
	idStudent: number;
	token: string;
}): Promise<StudentDetail> {
	const response = await axios.get(
		`${apiTeacherUrl}/courses/${idCourse}/students/${idStudent}`,
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

export async function createStudent({
	idCourse,
	token,
	student
}: {
	idCourse: number;
	token: string;
	student: StudentCreate;
}): Promise<{ id: number }> {
	const response = await axios.post(
		`${apiTeacherUrl}/courses/${idCourse}/students`,
		student,
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

export async function updateStudent({
	idCourse,
	idStudent,
	token,
	student
}: {
	idCourse: number;
	idStudent: number;
	token: string;
	student: StudentUpdate;
}): Promise<{ message: string }> {
	const response = await axios.put(
		`${apiTeacherUrl}/courses/${idCourse}/students/${idStudent}`,
		student,
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

export async function deleteStudent({
	idCourse,
	idStudent,
	token
}: {
	idCourse: number;
	idStudent: number;
	token: string;
}): Promise<{ message: string }> {
	const response = await axios.delete(
		`${apiTeacherUrl}/courses/${idCourse}/students/${idStudent}`,
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
