import React, { createContext, useState } from 'react';

const TeacherContext = createContext<{
	coursesData: {
		idSelectedCourse: number | null;
		setIdSelectedCourse: Function;
	};
}>({
	coursesData: {
		idSelectedCourse: null,
		setIdSelectedCourse: () => {}
	}
});

const TeacherProvider = ({ children }: { children: React.ReactNode }) => {
	const [idSelectedCourse, setIdSelectedCourse] = useState<number | null>(
		null
	);

	return (
		<TeacherContext.Provider
			value={{
				coursesData: {
					idSelectedCourse,
					setIdSelectedCourse
				}
			}}
		>
			{children}
		</TeacherContext.Provider>
	);
};

export { TeacherContext, TeacherProvider };
