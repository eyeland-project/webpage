import { environment } from '@environments/environment';
import {
	QuestionPostaskDetail,
	QuestionDuringtaskDetail,
	QuestionPretaskDetail
} from '@interfaces/teacher/Question.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function getQuestionsPretask({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<QuestionPretaskDetail[]> {
	return getQuestionsFromTaskStage({
		taskStageName: 'pretask',
		idTask,
		token
	});
}

export async function getQuestionsFromDuringtask({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<QuestionDuringtaskDetail[]> {
	return getQuestionsFromTaskStage({
		taskStageName: 'duringtask',
		idTask,
		token
	});
}

export async function getQuestionsPostask({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<QuestionPostaskDetail[]> {
	return getQuestionsFromTaskStage({
		taskStageName: 'postask',
		idTask,
		token
	});
}

async function getQuestionsFromTaskStage({
	taskStageName,
	idTask,
	token
}: {
	taskStageName: string;
	idTask: number;
	token: string;
}): Promise<any> {
	const response = await axios.get(
		`${apiTeacherUrl}/tasks/${idTask}/${taskStageName}/questions`,
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
