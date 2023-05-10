import { useState, useCallback } from 'react';

import useAuthStorage from '@hooks/useAuthStorage';
import * as taskApi from '@api/teacher/task.api';

import { TaskDetail, TaskSummary } from '@interfaces/teacher/Task.interface';

const useTask = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState<TaskSummary[] | null>(null);
	const [task, setTask] = useState<TaskDetail | null>(null);

	const getTasks: () => Promise<TaskSummary[]> = useCallback(async () => {
		setLoading(true);
		try {
			const tasks = await taskApi.getTasks({
				token: authStorage.getAccessToken()!
			});
			setLoading(false);
			setTasks(tasks);
			return tasks;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	const getTask: (idTask: number) => Promise<TaskDetail> = useCallback(
		async (idTask: number) => {
			setLoading(true);
			try {
				const task = await taskApi.getTask({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setTask(task);
				return task;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	return {
		loading,
		tasks,
		setTasks,
		getTasks,
		task,
		setTask,
		getTask
	};
};

export default useTask;
