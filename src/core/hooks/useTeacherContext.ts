import { useContext } from 'react';
import { TeacherContext } from '@contexts/TeacherContext';

function useTeacherContext() {
	const context = useContext(TeacherContext);
	if (context === undefined) {
		throw new Error(
			'useTeacherContext must be used within a TeacherProvider'
		);
	}
	return context;
}

export default useTeacherContext;
