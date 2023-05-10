import { environment } from '@environments/environment';
import {
	GradeAnswerCreate,
	GradeAnswerUpdate
} from '@interfaces/teacher/GradeAnswer.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function createGradeAnswer({
	idCourse,
	idTaskAttempt,
	idAnswer,
	token,
	gradeAnswer
}: {
	idCourse: number;
	idTaskAttempt: number;
	idAnswer: number;
	token: string;
	gradeAnswer: GradeAnswerCreate;
}): Promise<{ id: number }> {
	const response = await axios.post(
		`${apiTeacherUrl}/courses/${idCourse}/taskAttempts/${idTaskAttempt}/answers/${idAnswer}/gradeAnswers`,
		gradeAnswer,
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 201) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function updateGradeAnswer({
	idCourse,
	idTaskAttempt,
	idAnswer,
	token,
	gradeAnswer,
	idGradeAnswer
}: {
	idCourse: number;
	idTaskAttempt: number;
	idAnswer: number;
	token: string;
	gradeAnswer: GradeAnswerUpdate;
	idGradeAnswer: number;
}): Promise<{ message: string }> {
	const response = await axios.put(
		`${apiTeacherUrl}/courses/${idCourse}/taskAttempts/${idTaskAttempt}/answers/${idAnswer}/gradeAnswers/${idGradeAnswer}`,
		gradeAnswer,
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

export async function deleteGradeAnswer({
	idCourse,
	idTaskAttempt,
	idAnswer,
	token,
	idGradeAnswer
}: {
	idCourse: number;
	idTaskAttempt: number;
	idAnswer: number;
	token: string;
	idGradeAnswer: number;
}): Promise<{ message: string }> {
	const response = await axios.delete(
		`${apiTeacherUrl}/courses/${idCourse}/taskAttempts/${idTaskAttempt}/answers/${idAnswer}/gradeAnswers/${idGradeAnswer}`,
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
