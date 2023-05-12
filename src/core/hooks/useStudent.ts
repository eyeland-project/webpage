import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';

import * as studentApi from '@api/teacher/student.api';

import {
	StudentCreate,
	StudentDetail,
	StudentSummary,
	StudentUpdate
} from '@interfaces/teacher/Student.interface';

const useStudent = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [students, setStudents] = useState<StudentSummary[] | null>(null);
	const [student, setStudent] = useState<StudentDetail | null>(null);

	const getStudents: (idCourse: number) => Promise<StudentSummary[]> =
		useCallback(async (idCourse: number) => {
			setLoading(true);
			try {
				const students = await studentApi.getStudents({
					token: authStorage.getAccessToken()!,
					idCourse
				});
				setLoading(false);
				setStudents(students);
				return students;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	const getStudent: (
		idCourse: number,
		idStudent: number
	) => Promise<StudentDetail> = useCallback(
		async (idCourse: number, idStudent: number) => {
			setLoading(true);
			try {
				const student = await studentApi.getStudent({
					token: authStorage.getAccessToken()!,
					idCourse,
					idStudent
				});
				setLoading(false);
				setStudent(student);
				return student;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const createStudent = useCallback(
		async (idCourse: number, student: StudentCreate) => {
			setLoading(true);
			try {
				const response = await studentApi.createStudent({
					token: authStorage.getAccessToken()!,
					idCourse,
					student
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

	const updateStudent = useCallback(
		async (idCourse: number, idStudent: number, student: StudentUpdate) => {
			setLoading(true);
			try {
				const response = await studentApi.updateStudent({
					token: authStorage.getAccessToken()!,
					idCourse,
					idStudent,
					student
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

	const deleteStudent = useCallback(
		async (idCourse: number, idStudent: number) => {
			setLoading(true);
			try {
				const response = await studentApi.deleteStudent({
					token: authStorage.getAccessToken()!,
					idCourse,
					idStudent
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
		students,
		setStudents,
		getStudents,
		student,
		setStudent,
		getStudent,
		createStudent,
		updateStudent,
		deleteStudent
	};
};

export default useStudent;
