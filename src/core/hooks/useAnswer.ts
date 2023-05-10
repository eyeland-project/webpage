import { useState, useCallback } from 'react';

import useAuthStorage from '@hooks/useAuthStorage';
import * as answerApi from '@api/teacher/answer.api';

import {
	QuestionSubmissionDetailDuringtask,
	QuestionSubmissionDetailPostask,
	QuestionSubmissionDetailPretask
} from '@interfaces/teacher/Answer.interface';

const useAnswer = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [pretask, setPretask] =
		useState<QuestionSubmissionDetailPretask | null>(null);
	const [duringtask, setDuringtask] =
		useState<QuestionSubmissionDetailDuringtask | null>(null);
	const [postask, setPostask] =
		useState<QuestionSubmissionDetailPostask | null>(null);

	const getPretask: (
		idCourse: number,
		idTaskAttempt: number
	) => Promise<QuestionSubmissionDetailPretask> = useCallback(
		async (idCourse: number, idTaskAttempt: number) => {
			setLoading(true);
			try {
				const answer = await answerApi.getAnswersFromPretask({
					idCourse,
					idTaskAttempt,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setPretask(answer);
				return answer;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getDuringtask: (
		idCourse: number,
		idTaskAttempt: number
	) => Promise<QuestionSubmissionDetailDuringtask> = useCallback(
		async (idCourse: number, idTaskAttempt: number) => {
			setLoading(true);
			try {
				const answer = await answerApi.getAnswersFromDuringtask({
					idCourse,
					idTaskAttempt,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setPretask(answer);
				return answer;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getPostask: (
		idCourse: number,
		idTaskAttempt: number
	) => Promise<QuestionSubmissionDetailPostask> = useCallback(
		async (idCourse: number, idTaskAttempt: number) => {
			setLoading(true);
			try {
				const answer = await answerApi.getAnswersFromPostask({
					idCourse,
					idTaskAttempt,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setPretask(answer);
				return answer;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	return {
		loading,
		pretask,
		duringtask,
		postask,
		getPretask,
		getDuringtask,
		getPostask,
		setPretask,
		setDuringtask,
		setPostask
	};
};

export default useAnswer;
