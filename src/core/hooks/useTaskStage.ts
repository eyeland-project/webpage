import { useState, useCallback } from 'react';

import useAuthStorage from '@hooks/useAuthStorage';
import * as taskStageApi from '@api/teacher/taskStage.api';

import {
	TaskStageDetail,
	TaskStagesDetail
} from '@interfaces/teacher/TaskStage.interface';

const useTaskStage = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [taskStages, setTaskStages] = useState<TaskStagesDetail | null>(null);
	const [pretask, setPretask] = useState<TaskStageDetail | null>(null);
	const [duringtask, setDuringtask] = useState<TaskStageDetail | null>(null);
	const [postask, setPostask] = useState<TaskStageDetail | null>(null);

	const getTaskStages: (idTask: number) => Promise<TaskStagesDetail> =
		useCallback(async (idTask: number) => {
			setLoading(true);
			try {
				const taskStages = await taskStageApi.getTaskStages({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setTaskStages(taskStages);
				return taskStages;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	const getPretask: (idTask: number) => Promise<TaskStageDetail> =
		useCallback(async (idTask: number) => {
			setLoading(true);
			try {
				const taskStage = await taskStageApi.getPretask({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setPretask(taskStage);
				return taskStage;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	const getDuringtask: (idTask: number) => Promise<TaskStageDetail> =
		useCallback(async (idTask: number) => {
			setLoading(true);
			try {
				const taskStage = await taskStageApi.getDuringtask({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setPretask(taskStage);
				return taskStage;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	const getPostask: (idTask: number) => Promise<TaskStageDetail> =
		useCallback(async (idTask: number) => {
			setLoading(true);
			try {
				const taskStage = await taskStageApi.getPostask({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setPretask(taskStage);
				return taskStage;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	return {
		loading,
		taskStages,
		setTaskStages,
		getTaskStages,
		pretask,
		setPretask,
		getPretask,
		duringtask,
		setDuringtask,
		getDuringtask,
		postask,
		setPostask,
		getPostask
	};
};

export default useTaskStage;
