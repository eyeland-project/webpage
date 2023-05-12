import { useState, useCallback } from 'react';

import useAuthStorage from '@hooks/useAuthStorage';
import * as taskAttemptApi from '@api/teacher/taskAttempt.api';

import { TaskAttemptSubmissionDetail } from '@interfaces/teacher/TaskAttempt.interface';

const useTaskAttempt = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [taskAttempts, setTaskAttempts] = useState<
		TaskAttemptSubmissionDetail[] | null
	>(null);
	const [submissions, setSubmissions] = useState<
		TaskAttemptSubmissionDetail[] | null
	>(null);
	const [taskAttempt, setTaskAttempt] =
		useState<TaskAttemptSubmissionDetail | null>(null);

	const getTaskAttempts: (
		idCourse: number
	) => Promise<TaskAttemptSubmissionDetail[]> = useCallback(
		async (idCourse: number) => {
			setLoading(true);
			try {
				const taskAttempts = await taskAttemptApi.getTaskAttempts({
					idCourse,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setTaskAttempts(taskAttempts);
				return taskAttempts;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getSubmissions: (
		idCourse: number
	) => Promise<TaskAttemptSubmissionDetail[]> = useCallback(
		async (idCourse: number) => {
			setLoading(true);
			try {
				const taskAttempts =
					await taskAttemptApi.getTaskAttemptSubmissions({
						idCourse,
						token: authStorage.getAccessToken()!
					});
				setLoading(false);
				setSubmissions(taskAttempts);
				return taskAttempts;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getTaskAttempt: (
		idCourse: number,
		idTaskAttempt: number
	) => Promise<TaskAttemptSubmissionDetail> = useCallback(
		async (idCourse: number, idTaskAttempt: number) => {
			setLoading(true);
			try {
				const taskAttempt = await taskAttemptApi.getTaskAttempt({
					idCourse,
					idTaskAttempt,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setTaskAttempt(taskAttempt);
				return taskAttempt;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	return {
		loading,
		taskAttempts,
		setTaskAttempts,
		getTaskAttempts,
		taskAttempt,
		setTaskAttempt,
		getTaskAttempt,
		submissions,
		setSubmissions,
		getSubmissions
	};
};

export default useTaskAttempt;
