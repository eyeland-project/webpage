import { ReactNode, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import useCourse from '@hooks/useCourse';
import useTeacherContext from '@hooks/useTeacherContext';
import { useTranslation } from 'react-i18next';

import Ribbon from '@pages/Teacher/components/Ribbon';
import { CourseSectionCard } from '@pages/Teacher/Course/components/CourseSectionCard';

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

	const { t } = useTranslation('', { keyPrefix: 'teacher.course.sections' });

	const sections = idCourse !== null ? getSections(idCourse) : [];

	function getSections(idCourse: number): {
		title: ReactNode;
		img: ReactNode;
		link: string;
	}[] {
		return [
			{
				title: t('collaboration'),
				img: <Lottie animationData={DesktopAndMobile} loop={true} />,
				link: `/teacher/session?idCourse=${idCourse}`
			},
			{
				title: t('students'),
				img: <Lottie animationData={Taskman} loop={true} />,
				link: `/teacher/students?idCourse=${idCourse}`
			},
			{
				title: t('evaluation'),
				img: <Lottie animationData={Evaluation} loop={true} />,
				link: `/teacher/submissions?idCourse=${idCourse}`
			}
		];
	}

	useEffect(() => {
		setIdCourse(parseNumericParam(idCourseStr));
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
		<div className="min-h-screen">
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
						{sections.map(({ img, link, title }, index) => (
							<CourseSectionCard
								key={index}
								img={img}
								link={link}
								title={title}
							/>
						))}
					</div>
				) : (
					<LoadingScreen loading={loading} />
				)}
			</div>
		</div>
	);
}

export default Course;
