import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useTeacherContext from '@hooks/useTeacherContext';

import Ribbon from './components/Ribbon';

import { parseNumericParam } from '@utils/routing.utils';

import useStudent from '@hooks/useStudent';
import useCourse from '@hooks/useCourse';
import ButtonPrimary from '@components/ButtonPrimary';

import DataGridIcon from '@icons/DataGrid.svg';
import AddIcon from '@icons/Add.svg';
import Loading from 'react-loading';
import TableStudents from './components/TableStudents';

function Students() {
	// navigation
	const navigate = useNavigate();
	// query params
	const [searchParams] = useSearchParams();
	// context
	const {
		coursesData: {
			course,
			setCourse,
			idSelectedCourse,
			setIdSelectedCourse
		}
	} = useTeacherContext();
	// useStudents
	const {
		getStudents,
		students,
		setStudents,
		loading: loadingStudents
	} = useStudent();
	const { getCourse } = useCourse();

	// states
	const [idCourse, setIdCourse] = useState<number | null>(
		parseNumericParam(searchParams.get('idCourse'))
	);

	useEffect(() => {
		const idCourseNum = parseNumericParam(searchParams.get('idCourse'));
		if (idCourseNum === null) {
			return navigate('/teacher/courses');
		}
		if (idCourseNum !== idCourse) setIdCourse(idCourseNum);
	}, [searchParams]);

	useEffect(() => {
		if (idCourse === null) {
			return navigate('/teacher/courses');
		}
		if (idSelectedCourse !== idCourse) setIdSelectedCourse(idCourse);
		if (idSelectedCourse !== idCourse || !course) {
			getCourse(idCourse)
				.then((course) => {
					setCourse(course);
				})
				.catch(() => {
					if (course !== null) setCourse(null);
				});
			getStudents(idCourse).catch(() => {
				if (students !== null) setStudents(null);
			});
		}
	}, [idCourse]);

	// useEffect(() => {
	// }, []);

	if (idCourse === null) return <></>;

	return (
		<div className="h-screen">
			<Ribbon>
				<>
					<img
						src={DataGridIcon}
						alt="GraduationCap"
						className="w-5 h-5"
					/>
					<div className="text-white font-semibold">
						{course?.name || ''}
					</div>
				</>
			</Ribbon>
			<div className="pt-12 h-full relative flex flex-col items-center gap-10">
				<div className="flex flex-row gap-3 mt-4">
					<div className="shadow-md px-36 py-2 font-semibold text-2xl">
						Listado de alumnos
					</div>
					<ButtonPrimary paddingX={false} bgColor="green-primary">
						<div className="relative h-full px-6 hover:scale-105 duration-200 ease-in-out">
							<img
								src={AddIcon}
								alt="Nuevo"
								className="invert w-5/6 h-5/6 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
							/>
						</div>
						{/* <div className="relative w-12 h-full text-green-primary">
							.
							<img
								src={AddIcon}
								alt="Nuevo"
								className="invert w-full h-full absolute top-0 left-0"
							/>
						</div> */}
					</ButtonPrimary>
				</div>
				{students ? (
					<div className="pb-10">
						<TableStudents students={students} />
					</div>
				) : (
					<div className="flex flex-col grow justify-center items-center h-full">
						{loadingStudents ? (
							<Loading type="spin" color="#0D9748" />
						) : (
							<div className="italic w-3/5 text-center text-lg">
								No se pudo obtener la información
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Students;
