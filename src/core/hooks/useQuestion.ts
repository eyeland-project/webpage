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
	const [questionsFromTask, setQuestionsFromTask] =
		useState<QuestionsTaskDetail | null>(null);

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
		questionsFromTask,
		setQuestionsFromTask,
		getQuestionsFromTask
	};
};

export default useQuestion;
