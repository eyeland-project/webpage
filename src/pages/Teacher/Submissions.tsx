import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'react-loading';

import useTeacherContext from '@hooks/useTeacherContext';
import useCourse from '@hooks/useCourse';
import useTaskAttempt from '@hooks/useTaskAttempt';

import Ribbon from '@pages/Teacher/components/Ribbon';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';
import TableSubmissions from './components/TableSubmissions';

function Submissions() {
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
	const {
		getSubmissions,
		submissions,
		setSubmissions,
		loading: loadingSubmissions
	} = useTaskAttempt();
	// useStudents
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
		if (!course || course.id !== idCourse) {
			getCourse(idCourse)
				.then((course) => {
					setCourse(course);
				})
				.catch(() => {
					if (course !== null) setCourse(null);
				});
		}
		if (!submissions || course?.id !== idCourse) {
			getSubmissions(idCourse).catch(() => {
				if (submissions?.length) setSubmissions(null);
			});
		}
	}, [idCourse]);

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
						{(course?.name ? `${course.name} - ` : '') +
							'Evaluación'}
						{/* {`${course?.name} -`} */}
					</div>
				</>
			</Ribbon>
			{submissions ? (
				<div className="pt-10 h-full px-10">
					<div className="font-semibold text-2xl mt-6">
						Evaluación
					</div>
					<TableSubmissions
						idCourse={idCourse}
						taskAttempts={submissions || []}
					/>
				</div>
			) : (
				<div className="flex flex-col grow justify-center items-center h-full">
					{loadingSubmissions ? (
						<Loading type="spin" color="#0D9748" />
					) : (
						<div className="italic w-3/5 text-center text-lg">
							No se pudo obtener la información
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Submissions;
