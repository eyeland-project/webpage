import { useEffect } from 'react';
import Loading from 'react-loading';

import useCourses from '@hooks/useCourses';
import useTeacherContext from '@hooks/useTeacherContext';

import Course from '@icons/Course.svg';

function SubMenuCourses() {
	const { courses, getCourses, loading } = useCourses();
	const {
		coursesData: { idSelectedCourse, setIdSelectedCourse }
	} = useTeacherContext();

	const onSelectCourse = (id: number) => {
		setIdSelectedCourse(id);
	};

	useEffect(() => {
		setIdSelectedCourse(null);
		getCourses().catch(() => { });
	}, []);

	return (
		<div className="h-full text-white px-6 py-6 flex flex-col">
			<div className="font-semibold text-lg flex items-center gap-4 text-center before:content-[''] before:grow before:border before:border-white before:border-solid after:content-[''] after:grow after:border after:border-white after:border-solid">
				Cursos
			</div>
			<div className="flex flex-col gap-4 mt-4 items-center text-sm grow">
				{courses ? (
					courses.map(({ name, id }) => (
						<div
							key={id}
							className={`flex items-center gap-4 px-4 py-2 rounded-md cursor-pointer ${idSelectedCourse === id
									? 'bg-white bg-opacity-20'
									: 'hover:bg-white hover:bg-opacity-10'
								}`}
							onClick={() => onSelectCourse(id)}
						>
							<img
								src={Course}
								alt="Icon"
								className=" w-6 h-6"
							/>
							{name}
						</div>
					))
				) : (
					<div className="flex flex-col grow justify-center items-center">
						{loading ? (
							<Loading type="spin" width={50} />
						) : (
							<div className="italic w-3/5 text-center text-xs">
								No se pudo obtener la información
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default SubMenuCourses;
