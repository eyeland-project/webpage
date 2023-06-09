import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'react-loading';

import useTeacherContext from '@hooks/useTeacherContext';
import useCourse from '@hooks/useCourse';
import useTaskAttempt from '@hooks/useTaskAttempt';
import { useTranslation } from 'react-i18next';

import Ribbon from '@pages/Teacher/components/Ribbon';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';
import TableSubmissions from './components/TableSubmissions';
import LoadingScreen from '@components/LoadingScreen';

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

	const { t } = useTranslation('', { keyPrefix: 'teacher.submissions' });

	useEffect(() => {
		setIdCourse(parseNumericParam(searchParams.get('idCourse')));
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
		<div className="min-h-screen">
			<Ribbon>
				<>
					<img
						src={DataGridIcon}
						alt="GraduationCap"
						className="w-5 h-5"
					/>
					<div className="text-white font-semibold">
						{(course?.name ? `${course.name} - ` : '') +
							t('ribbon')}
					</div>
				</>
			</Ribbon>
			{submissions ? (
				<div className="pt-10 h-full px-10">
					<div className="font-semibold text-2xl mt-6">
						{t('submissionsList.title')}
					</div>
					<TableSubmissions
						idCourse={idCourse}
						taskAttempts={submissions || []}
					/>
				</div>
			) : (
				<LoadingScreen loading={loadingSubmissions} />
			)}
		</div>
	);
}

export default Submissions;
