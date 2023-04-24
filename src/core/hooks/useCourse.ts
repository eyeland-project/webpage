import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';

import * as courseApi from '@api/teacher/course.api';

import {
	CourseDetail,
	CourseSummary
} from '@interfaces/teacher/Course.interface';

const useCourse = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [courses, setCourses] = useState<CourseSummary[] | null>(null);
	const [course, setCourse] = useState<CourseDetail | null>(null);

	const getCourses: () => Promise<CourseSummary[]> = useCallback(async () => {
		setLoading(true);
		try {
			const courses = await courseApi.getCourses({
				token: authStorage.getAccessToken()!
			});
			setLoading(false);
			setCourses(courses);
			return courses;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	const getCourse: (idCourse: number) => Promise<CourseDetail> = useCallback(
		async (idCourse: number) => {
			setLoading(true);
			try {
				const course = await courseApi.getCourse({
					token: authStorage.getAccessToken()!,
					idCourse
				});
				setLoading(false);
				setCourse(course);
				return course;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const createSession = useCallback(async (idCourse: number) => {
		setLoading(true);
		try {
			const response = await courseApi.createSession({
				token: authStorage.getAccessToken()!,
				idCourse
			});
			setLoading(false);
			return response;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	const startSession = useCallback(async (idCourse: number) => {
		setLoading(true);
		try {
			const response = await courseApi.startSession({
				token: authStorage.getAccessToken()!,
				idCourse
			});
			setLoading(false);
			return response;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	const endSession = useCallback(async (idCourse: number) => {
		setLoading(true);
		try {
			const response = await courseApi.endSession({
				token: authStorage.getAccessToken()!,
				idCourse
			});
			setLoading(false);
			return response;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	return {
		loading,
		courses,
		setCourses,
		getCourses,
		course,
		setCourse,
		getCourse,
		createSession,
		startSession,
		endSession
	};
};

export default useCourse;
