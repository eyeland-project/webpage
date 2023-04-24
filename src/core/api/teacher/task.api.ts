import { environment } from '@environments/environment';
import { TaskDetail, TaskSummary } from '@interfaces/teacher/Task.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function getTasks({
	token
}: {
	token: string;
}): Promise<TaskSummary[]> {
	const response = await axios.get(`${apiTeacherUrl}/tasks`, {
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
	const response = await axios.get(`${apiTeacherUrl}/tasks/${idTask}`, {
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
