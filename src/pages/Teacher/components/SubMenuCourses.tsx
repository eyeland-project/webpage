import useCourses from '@hooks/useCourses';
import useTeacherContext from '@hooks/useTeacherContext';
import { useEffect } from 'react';

function SubMenuCourses() {
	const { courses, getCourses } = useCourses();
	const {
		coursesData: { idSelectedCourse, setIdSelectedCourse }
	} = useTeacherContext();

	const onSelectCourse = (id: number) => {
		setIdSelectedCourse(id);
	};

	useEffect(() => {
		getCourses();
	}, []);

	return (
		<div className="h-full text-white px-6 py-6">
			<div className="font-semibold text-lg flex items-center gap-4 text-center before:content-[''] before:grow before:border before:border-white before:border-solid after:content-[''] after:grow after:border after:border-white after:border-solid">
				Cursos
			</div>
			<div className="flex flex-col gap-4 mt-4">
				{courses?.map(({ name, id }) => (
					<div
						key={id}
						className={`flex items-center gap-4 px-4 py-2 rounded-md cursor-pointer ${
							idSelectedCourse === id
								? 'bg-white bg-opacity-20'
								: 'hover:bg-white hover:bg-opacity-10'
						}`}
						onClick={() => onSelectCourse(id)}
					>
						<img
							src="src/assets/icons/Course.svg"
							alt="Icon"
							className=" w-6 h-6"
						/>
						{name}
					</div>
				))}
			</div>
		</div>
	);
}

export default SubMenuCourses;
