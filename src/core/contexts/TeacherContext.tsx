import { CourseDetail } from '@interfaces/teacher/Course.interface';
import React, { createContext, useState } from 'react';

const TeacherContext = createContext<{
	coursesData: {
		idSelectedCourse: number | null;
		setIdSelectedCourse: Function;
		course: CourseDetail | null;
		setCourse: Function;
	};
	tasksData: {
		idSelectedTask: number | null;
		setIdSelectedTask: Function;
	};
}>({
	coursesData: {
		idSelectedCourse: null,
		setIdSelectedCourse: () => {},
		course: null,
		setCourse: () => {}
	},
	tasksData: {
		idSelectedTask: null,
		setIdSelectedTask: () => {}
	}
});

const TeacherProvider = ({ children }: { children: React.ReactNode }) => {
	const [idSelectedCourse, setIdSelectedCourse] = useState<number | null>(
		null
	);
	const [course, setCourse] = useState<CourseDetail | null>(null);
	const [idSelectedTask, setIdSelectedTask] = useState<number | null>(null);

	return (
		<TeacherContext.Provider
			value={{
				coursesData: {
					idSelectedCourse,
					setIdSelectedCourse,
					course,
					setCourse
				},
				tasksData: {
					idSelectedTask,
					setIdSelectedTask
				}
			}}
		>
			{children}
		</TeacherContext.Provider>
	);
};

export { TeacherContext, TeacherProvider };
