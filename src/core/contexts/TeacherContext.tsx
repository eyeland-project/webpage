import { CourseDetail } from '@interfaces/Course.interface';
import React, { createContext, useState } from 'react';

const TeacherContext = createContext<{
	coursesData: {
		idSelectedCourse: number | null;
		setIdSelectedCourse: Function;
		course: CourseDetail | null;
		setCourse: Function;
	};
}>({
	coursesData: {
		idSelectedCourse: null,
		setIdSelectedCourse: () => {},
		course: null,
		setCourse: () => {}
	}
});

const TeacherProvider = ({ children }: { children: React.ReactNode }) => {
	const [idSelectedCourse, setIdSelectedCourse] = useState<number | null>(
		null
	);
	const [course, setCourse] = useState<CourseDetail | null>(null);

	return (
		<TeacherContext.Provider
			value={{
				coursesData: {
					idSelectedCourse,
					setIdSelectedCourse,
					course,
					setCourse
				}
			}}
		>
			{children}
		</TeacherContext.Provider>
	);
};

export { TeacherContext, TeacherProvider };
