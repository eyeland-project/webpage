import { environment } from '@environments/environment';
import {
	TaskStageDetail,
	TaskStagesDetail
} from '@interfaces/teacher/TaskStage.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function getTaskStages({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<TaskStagesDetail> {
	const response = await axios.get(
		`${apiTeacherUrl}/tasks/${idTask}/taskStages`,
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

export async function getPretask({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<TaskStageDetail> {
	return getTaskStage({
		taskStageName: 'pretask',
		idTask,
		token
	});
}

export async function getDuringtask({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<TaskStageDetail> {
	return getTaskStage({
		taskStageName: 'duringtask',
		idTask,
		token
	});
}

export async function getPostask({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<TaskStageDetail> {
	return getTaskStage({
		taskStageName: 'postask',
		idTask,
		token
	});
}

async function getTaskStage({
	taskStageName,
	idTask,
	token
}: {
	taskStageName: string;
	idTask: number;
	token: string;
}): Promise<TaskStageDetail> {
	const response = await axios.get(
		`${apiTeacherUrl}/tasks/${idTask}/${taskStageName}`,
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
