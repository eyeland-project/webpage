import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';
import axios from 'axios';

import { environment } from '@environments/environment';

import { CourseDetail, CourseSummary } from '@interfaces/Course.interface';

const useCourses = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [courses, setCourses] = useState<CourseSummary[] | null>(null);
	const [course, setCourse] = useState<CourseDetail | null>(null);

	const getCourses: () => Promise<CourseSummary[]> = useCallback(async () => {
		setLoading(true);
		const response = await axios.get(`${environment.apiUrl}/courses`, {
			headers: {
				Authorization: `Bearer ${authStorage.getAccessToken()}`
			},
			timeout: 10000
		});

		setLoading(false);
		if (response.status === 200) {
			setCourses(response.data);
			return response.data;
		} else {
			throw new Error(response.data);
		}
	}, []);

	const getCourse: (id: number) => Promise<CourseDetail> = useCallback(
		async (id: number) => {
			setLoading(true);
			const response = await axios.get(
				`${environment.apiUrl}/courses/${id}`,
				{
					headers: {
						Authorization: `Bearer ${authStorage.getAccessToken()}`
					},
					timeout: 10000
				}
			);

			setLoading(false);
			if (response.status === 200) {
				setCourse(response.data);
				return response.data;
			} else {
				throw new Error(response.data);
			}
		},
		[]
	);

	const createSession = useCallback(async (courseId: number) => {
		setLoading(true);
		const response = await axios.post(
			`${environment.apiUrl}/courses/${courseId}/session`,
			{},
			{
				headers: {
					Authorization: `Bearer ${authStorage.getAccessToken()}`
				},
				timeout: 10000
			}
		);

		setLoading(false);
		if (response.status === 201) {
			return response.data;
		} else {
			throw new Error(response.data);
		}
	}, []);

	const startSession = useCallback(async (courseId: number) => {
		setLoading(true);
		const response = await axios.post(
			`${environment.apiUrl}/courses/${courseId}/session/start`,
			{},
			{
				headers: {
					Authorization: `Bearer ${authStorage.getAccessToken()}`
				},
				timeout: 10000
			}
		);

		setLoading(false);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error(response.data);
		}
	}, []);

	const endSession = useCallback(async (courseId: number) => {
		setLoading(true);
		const response = await axios.put(
			`${environment.apiUrl}/courses/${courseId}/session/end`,
			{},
			{
				headers: {
					Authorization: `Bearer ${authStorage.getAccessToken()}`
				},
				timeout: 10000
			}
		);

		setLoading(false);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error(response.data);
		}
	}, []);

	return {
		loading,
		courses,
		getCourses,
		course,
		getCourse,
		createSession,
		startSession,
		endSession
	};
};

export default useCourses;
