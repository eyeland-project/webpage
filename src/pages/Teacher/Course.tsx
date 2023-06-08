import { ReactNode, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from 'react-loading';
import Lottie from 'lottie-react';

import useCourse from '@hooks/useCourse';
import useTeacherContext from '@hooks/useTeacherContext';

import Ribbon from '@pages/Teacher/components/Ribbon';
import { CourseSectionCard } from '@pages/Teacher/components/CourseSectionCard';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';
import DesktopAndMobile from '@animations/DesktopAndMobile.json';
import Taskman from '@animations/Taskman.json';
import Evaluation from '@animations/Evaluation.json';
import LoadingScreen from '@components/LoadingScreen';

function Course() {
	// navigation
	const navigate = useNavigate();
	// params
	const { idCourse: idCourseStr } = useParams<{ idCourse: string }>();
	// context
	const {
		coursesData: {
			idSelectedCourse,
			setIdSelectedCourse,
			course,
			setCourse
		}
	} = useTeacherContext();
	// useCourses hook
	const { getCourse, loading } = useCourse();

	// states
	const [idCourse, setIdCourse] = useState<number | null>(
		parseNumericParam(idCourseStr)
	);

	const sections = idCourse !== null ? getSections(idCourse) : [];

	useEffect(() => {
		const idCourseNum = parseNumericParam(idCourseStr);
		if (idCourseNum === null) {
			return navigate('/teacher/courses');
		}
		if (idCourseNum !== idCourse) setIdCourse(idCourseNum);
	}, [idCourseStr]);

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
	}, [idCourse]);

	return (
		<div className="h-screen">
			<Ribbon>
				<img
					src={DataGridIcon}
					alt="GraduationCap"
					className="w-5 h-5"
				/>
				<div className="text-white font-semibold">
					{course?.name || ''}
				</div>
			</Ribbon>
			<div className="px-8 pb-4 pt-10 h-full">
				{course ? (
					<div className="grid grid-cols-2 gap-x-16 gap-y-8 px-10 py-8">
						{sections.map(
							({ img, link, title, description }, index) => (
								<CourseSectionCard
									key={index}
									img={img}
									link={link}
									title={title}
									description={description}
								/>
							)
						)}
					</div>
				) : (
					<LoadingScreen loading={loading} />
				)}
			</div>
		</div>
	);
}

function getSections(idCourse: number): {
	title: ReactNode;
	description?: ReactNode;
	img: ReactNode;
	link: string;
}[] {
	return [
		{
			title: 'Colaboración',
			description: (
				<>
					El curso actualmente se encuentra{' '}
					<span className="font-bold">Activo</span>
				</>
			),
			img: <Lottie animationData={DesktopAndMobile} loop={true} />,
			link: `/teacher/session?idCourse=${idCourse}`
		},
		{
			title: 'Listado de alumnos',
			img: <Lottie animationData={Taskman} loop={true} />,
			link: `/teacher/students?idCourse=${idCourse}`
		},
		{
			title: 'Evaluación',
			img: <Lottie animationData={Evaluation} loop={true} />,
			link: `/teacher/submissions?idCourse=${idCourse}`
		}
	];
}

export default Course;
