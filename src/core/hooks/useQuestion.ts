import { useState, useCallback } from 'react';

import useAuthStorage from '@hooks/useAuthStorage';
import * as questionApi from '@api/teacher/question.api';

import {
	QuestionPretaskDetail,
	QuestionDuringtaskDetail,
	QuestionPostaskDetail,
	QuestionsTaskDetail
} from '@interfaces/teacher/Question.interface';

const useQuestion = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [questionsPretask, setQuestionsPretask] = useState<
		QuestionPretaskDetail[] | null
	>(null);
	const [questionsDuringtask, setQuestionsDuringtask] = useState<
		QuestionDuringtaskDetail[] | null
	>(null);
	const [questionsPostask, setQuestionsPostask] = useState<
		QuestionPostaskDetail[] | null
	>(null);
	const [questionsFromTask, setQuestionsFromTask] =
		useState<QuestionsTaskDetail | null>(null);

	const getQuestionsPretask: (
		idTask: number
	) => Promise<QuestionPretaskDetail[]> = useCallback(
		async (idTask: number) => {
			setLoading(true);
			try {
				const question = await questionApi.getQuestionsPretask({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setQuestionsPretask(question);
				return question;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getQuestionsDuringtask: (
		idTask: number
	) => Promise<QuestionDuringtaskDetail[]> = useCallback(
		async (idTask: number) => {
			setLoading(true);
			try {
				const question = await questionApi.getQuestionsDuringtask({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setQuestionsDuringtask(question);
				return question;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getQuestionsPostask: (
		idTask: number
	) => Promise<QuestionPostaskDetail[]> = useCallback(
		async (idTask: number) => {
			setLoading(true);
			try {
				const question = await questionApi.getQuestionsPostask({
					idTask,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setQuestionsPostask(question);
				return question;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getQuestionsFromTask: (
		idTask: number
	) => Promise<QuestionsTaskDetail> = useCallback(async (idTask: number) => {
		setLoading(true);
		try {
			const question = await questionApi.getQuestionsFromTask({
				idTask,
				token: authStorage.getAccessToken()!
			});
			setLoading(false);
			setQuestionsFromTask(question);
			return question;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	return {
		loading,
		questionsPretask,
		questionsDuringtask,
		questionsPostask,
		questionsFromTask,
		setQuestionsPretask,
		setQuestionsDuringtask,
		setQuestionsPostask,
		setQuestionsFromTask,
		getQuestionsPretask,
		getQuestionsDuringtask,
		getQuestionsPostask,
		getQuestionsFromTask
	};
};

export default useQuestion;
