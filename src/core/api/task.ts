import { environment } from '@environments/environment';
import { TaskDetail, TaskSummary } from '@interfaces/Task.interface';
import axios from 'axios';

const { apiUrl } = environment;

export async function getTasks({
	token
}: {
	token: string;
}): Promise<TaskSummary[]> {
	const response = await axios.get(`${apiUrl}/tasks`, {
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

export async function getTask({
	idTask,
	token
}: {
	idTask: number;
	token: string;
}): Promise<TaskDetail> {
	const response = await axios.get(`${apiUrl}/tasks/${idTask}`, {
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
