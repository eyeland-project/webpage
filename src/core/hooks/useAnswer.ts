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
	const [answersPretask, setAnswersPretask] = useState<
		QuestionSubmissionDetailPretask[] | null
	>(null);
	const [answersDuringtask, setAnswersDuringtask] = useState<
		QuestionSubmissionDetailDuringtask[] | null
	>(null);
	const [answersPostask, setAnswersPostask] = useState<
		QuestionSubmissionDetailPostask[] | null
	>(null);

	const getAnswersPretask: (
		idCourse: number,
		idTaskAttempt: number
	) => Promise<QuestionSubmissionDetailPretask[]> = useCallback(
		async (idCourse: number, idTaskAttempt: number) => {
			setLoading(true);
			try {
				const answer = await answerApi.getAnswersFromPretask({
					idCourse,
					idTaskAttempt,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setAnswersPretask(answer);
				return answer;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getAnswersDuringtask: (
		idCourse: number,
		idTaskAttempt: number
	) => Promise<QuestionSubmissionDetailDuringtask[]> = useCallback(
		async (idCourse: number, idTaskAttempt: number) => {
			setLoading(true);
			try {
				const answer = await answerApi.getAnswersFromDuringtask({
					idCourse,
					idTaskAttempt,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setAnswersDuringtask(answer);
				return answer;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getAnswersPostask: (
		idCourse: number,
		idTaskAttempt: number
	) => Promise<QuestionSubmissionDetailPostask[]> = useCallback(
		async (idCourse: number, idTaskAttempt: number) => {
			setLoading(true);
			try {
				const answer = await answerApi.getAnswersFromPostask({
					idCourse,
					idTaskAttempt,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				setAnswersPostask(answer);
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
		answersPretask,
		answersDuringtask,
		answersPostask,
		getAnswersPretask,
		getAnswersDuringtask,
		getAnswersPostask,
		setAnswersPretask,
		setAnswersDuringtask,
		setAnswersPostask
	};
};

export default useAnswer;
