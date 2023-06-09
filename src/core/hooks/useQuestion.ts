import { useState, useCallback } from 'react';

import useAuthStorage from '@hooks/useAuthStorage';
import * as questionApi from '@api/teacher/question.api';

import { QuestionsTaskDetail } from '@interfaces/teacher/Question.interface';

const useQuestion = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionsTaskDetail | null>(
		null
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
			setQuestions(question);
			return question;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	return {
		loading,
		questions,
		setQuestions,
		getQuestionsFromTask
	};
};

export default useQuestion;
