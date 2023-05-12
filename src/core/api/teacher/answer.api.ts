import { environment } from '@environments/environment';
import {
	QuestionSubmissionDetailDuringtask,
	QuestionSubmissionDetailPostask,
	QuestionSubmissionDetailPretask
} from '@interfaces/teacher/Answer.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function getAnswersFromPretask({
	idCourse,
	idTaskAttempt,
	token
}: {
	idCourse: number;
	idTaskAttempt: number;
	token: string;
}): Promise<QuestionSubmissionDetailPretask[]> {
	return getAnswersFromTaskStage({
		taskStageName: 'pretask',
		idCourse,
		idTaskAttempt,
		token
	});
}

export async function getAnswersFromDuringtask({
	idCourse,
	idTaskAttempt,
	token
}: {
	idCourse: number;
	idTaskAttempt: number;
	token: string;
}): Promise<QuestionSubmissionDetailDuringtask[]> {
	return getAnswersFromTaskStage({
		taskStageName: 'duringtask',
		idCourse,
		idTaskAttempt,
		token
	});
}

export async function getAnswersFromPostask({
	idCourse,
	idTaskAttempt,
	token
}: {
	idCourse: number;
	idTaskAttempt: number;
	token: string;
}): Promise<QuestionSubmissionDetailPostask[]> {
	return getAnswersFromTaskStage({
		taskStageName: 'postask',
		idCourse,
		idTaskAttempt,
		token
	});
}

async function getAnswersFromTaskStage({
	idCourse,
	idTaskAttempt,
	taskStageName,
	token
}: {
	idCourse: number;
	idTaskAttempt: number;
	taskStageName: string;
	token: string;
}): Promise<any> {
	const response = await axios.get(
		`${apiTeacherUrl}/courses/${idCourse}/taskAttempts/${idTaskAttempt}/answers/${taskStageName}`,
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
