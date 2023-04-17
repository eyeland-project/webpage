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
		try {
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
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	const getCourse: (id: number) => Promise<CourseDetail> = useCallback(
		async (id: number) => {
			try {
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
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const createSession = useCallback(async (courseId: number) => {
		try {
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
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	const startSession = useCallback(async (courseId: number) => {
		try {
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
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	const endSession = useCallback(async (courseId: number) => {
		try {
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

export default useCourses;
