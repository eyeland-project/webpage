import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';

import * as gradeAnswerApi from '@api/teacher/gradeAnswer.api';

import {
	GradeAnswerCreate,
	GradeAnswerUpdate
} from '@interfaces/teacher/GradeAnswer.interface';

const useGradeAnswer = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);

	const createGradeAnswer = useCallback(
		async (
			idCourse: number,
			idTaskAttempt: number,
			idAnswer: number,
			gradeAnswer: GradeAnswerCreate
		) => {
			setLoading(true);
			try {
				const response = await gradeAnswerApi.createGradeAnswer({
					idCourse,
					idTaskAttempt,
					idAnswer,
					gradeAnswer,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				return response;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const updateGradeAnswer = useCallback(
		async (
			idCourse: number,
			idTaskAttempt: number,
			idAnswer: number,
			idGradeAnswer: number,
			gradeAnswer: GradeAnswerUpdate
		) => {
			setLoading(true);
			try {
				const response = await gradeAnswerApi.updateGradeAnswer({
					idCourse,
					idTaskAttempt,
					idAnswer,
					idGradeAnswer,
					gradeAnswer,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				return response;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const deleteGradeAnswer = useCallback(
		async (
			idCourse: number,
			idTaskAttempt: number,
			idAnswer: number,
			idGradeAnswer: number
		) => {
			setLoading(true);
			try {
				const response = await gradeAnswerApi.deleteGradeAnswer({
					idCourse,
					idTaskAttempt,
					idAnswer,
					idGradeAnswer,
					token: authStorage.getAccessToken()!
				});
				setLoading(false);
				return response;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	return {
		loading,
		createGradeAnswer,
		updateGradeAnswer,
		deleteGradeAnswer
	};
};

export default useGradeAnswer;
