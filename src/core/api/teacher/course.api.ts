import { environment } from '@environments/environment';
import {
	CourseCreate,
	CourseDetail,
	CourseSummary,
	CourseUpdate
} from '@interfaces/teacher/Course.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function getCourses({
	token
}: {
	token: string;
}): Promise<CourseSummary[]> {
	const response = await axios.get(`${apiTeacherUrl}/courses`, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function getCourse({
	idCourse,
	token
}: {
	idCourse: number;
	token: string;
}): Promise<CourseDetail> {
	const response = await axios.get(`${apiTeacherUrl}/courses/${idCourse}`, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function createCourse({
	token,
	course
}: {
	token: string;
	course: CourseCreate;
}): Promise<{ id: number }> {
	const response = await axios.post(`${apiTeacherUrl}/courses`, course, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (response.status === 201) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function updateCourse({
	token,
	course,
	idCourse
}: {
	token: string;
	course: CourseUpdate;
	idCourse: number;
}): Promise<{ message: string }> {
	const response = await axios.put(
		`${apiTeacherUrl}/courses/${idCourse}`,
		course,
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function deleteCourse({
	token,
	idCourse
}: {
	token: string;
	idCourse: number;
}): Promise<{ message: string }> {
	const response = await axios.delete(
		`${apiTeacherUrl}/courses/${idCourse}`,
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function createSession({
	token,
	idCourse
}: {
	token: string;
	idCourse: number;
}): Promise<{ message: string }> {
	const response = await axios.post(
		`${apiTeacherUrl}/courses/${idCourse}/session`,
		{},
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 201) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function startSession({
	token,
	idCourse
}: {
	token: string;
	idCourse: number;
}): Promise<{ message: string }> {
	const response = await axios.post(
		`${apiTeacherUrl}/courses/${idCourse}/session/start`,
		{},
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}

export async function endSession({
	token,
	idCourse
}: {
	token: string;
	idCourse: number;
}): Promise<{ message: string }> {
	const response = await axios.put(
		`${apiTeacherUrl}/courses/${idCourse}/session/end`,
		{},
		{
			timeout: 10000,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}
