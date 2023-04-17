import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from 'react-loading';
import Lottie from 'lottie-react';

import useCourses from '@hooks/useCourses';
import useTeacherContext from '@hooks/useTeacherContext';

import Ribbon from '@pages/Teacher/components/Ribbon';

import CourseIcon from '@icons/Course.svg';
import { CourseSectionCard } from './components/CourseSectionCard';

import DesktopAndMobile from '@animations/DesktopAndMobile.json';
import Taskman from '@animations/Taskman.json';

function Course() {
	const navigate = useNavigate();
	const { idCourse: idCourseStr } = useParams<{ idCourse: string }>();
	const {
		coursesData: { setIdSelectedCourse }
	} = useTeacherContext();
	const { course, setCourse, getCourse, loading } = useCourses();

	const [idCourse, setIdCourse] = useState<number | null>(
		parseIdCourse(idCourseStr)
	);

	const sections = useCallback(() => {
		if (idCourse === null) return [];
		return getSections(idCourse);
	}, [idCourse]);

	useEffect(() => {
		const idCourseNum = parseIdCourse(idCourseStr);
		if (idCourseNum === null) {
			return navigate('/teacher/courses');
		}
		setIdCourse(idCourseNum);
	}, [idCourseStr]);

	useEffect(() => {
		if (idCourse === null) {
			return navigate('/teacher/courses');
		}
		setIdSelectedCourse(idCourse);
		getCourse(idCourse).catch(() => {
			if (course !== null) setCourse(null);
		});
	}, [idCourse]);

	return (
		<div className="h-screen">
			<Ribbon>
				<img src={CourseIcon} alt="GraduationCap" className="w-5 h-5" />
				<div className="text-white font-semibold">
					{course?.name || ''}
				</div>
			</Ribbon>
			<div className="px-8 py-4 h-full">
				{course ? (
					<div className="grid grid-cols-2 gap-x-16 gap-y-8 px-10 py-8">
						{sections().map(
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
					<div className="flex flex-col grow justify-center items-center h-full">
						{loading ? (
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

function parseIdCourse(idCourseStr: string | undefined) {
	const idCourseNum = parseInt(String(idCourseStr));
	if (isNaN(idCourseNum)) return null;
	return idCourseNum;
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
			link: '/teacher/students'
		}
	];
}

export default Course;
