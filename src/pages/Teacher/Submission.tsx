import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import useTeacherContext from '@hooks/useTeacherContext';
import useCourse from '@hooks/useCourse';
import useTaskAttempt from '@hooks/useTaskAttempt';
import useAnswer from '@hooks/useAnswer';

import Ribbon from '@pages/Teacher/components/Ribbon';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';

import UserIcon from '@icons/User.svg';
import GradeGrid from './components/GradeGrid';

function Submission() {
	// navigation
	const navigate = useNavigate();
	// params
	const { idTaskAttempt: idTaskAttemptStr } = useParams<{
		idTaskAttempt: string;
	}>();
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
	const { getTaskAttempt, taskAttempt, setTaskAttempt } = useTaskAttempt();
	const { answersPostask, getAnswersPostask, setAnswersPostask } =
		useAnswer();
	// useCourse
	const { getCourse } = useCourse();

	// states
	const [idCourse, setIdCourse] = useState<number | null>(
		parseNumericParam(searchParams.get('idCourse'))
	);
	const [idTaskAttempt, setIdTaskAttempt] = useState<number | null>(
		parseNumericParam(idTaskAttemptStr)
	);
	const [loadingTaskAttempt, setLoadingTaskAttempt] = useState(false);

	useEffect(() => {
		const idTaskAttemptNum = parseNumericParam(idTaskAttemptStr);
		if (idTaskAttemptNum === null) {
			return navigate(
				idCourse
					? `/teacher/submissions?idCourse=${idCourse}`
					: '/teacher/courses'
			);
		}
		if (idTaskAttemptNum !== idTaskAttempt) {
			setIdTaskAttempt(idTaskAttemptNum);
		}
	}, [idTaskAttemptStr]);

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
		if (idTaskAttempt === null) {
			return navigate(`/teacher/submissions?idCourse=${idCourse}`);
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
		if (
			(course?.id !== idCourse ||
				!taskAttempt ||
				taskAttempt.id !== idTaskAttempt) &&
			!loadingTaskAttempt
		) {
			if (!loadingTaskAttempt) setLoadingTaskAttempt(true);
		}
	}, [idCourse]);

	useEffect(() => {
		if (idCourse === null) {
			return navigate('/teacher/courses');
		}
		if (idTaskAttempt === null) {
			return navigate(`/teacher/submissions?idCourse=${idCourse}`);
		}
		if (
			(!taskAttempt || taskAttempt.id !== idTaskAttempt) &&
			!loadingTaskAttempt
		) {
			if (!loadingTaskAttempt) setLoadingTaskAttempt(true);
		}
	}, [idTaskAttempt]);

	useEffect(() => {
		if (
			!loadingTaskAttempt ||
			idCourse === null ||
			idTaskAttempt === null
		) {
			return;
		}
		getTaskAttempt(idCourse, idTaskAttempt)
			.catch(() => {
				if (taskAttempt !== null) setTaskAttempt(null);
			})
			.finally(() => {
				setLoadingTaskAttempt(false);
			});
		getAnswersPostask(idCourse, idTaskAttempt)
			.then((data) => {
				console.log(data);
			})
			.catch(() => {
				if (answersPostask?.length) setAnswersPostask([]);
			});
	}, [loadingTaskAttempt]);

	const timeStamp = useMemo(() => {
		if (!taskAttempt) return '';
		const date = new Date(taskAttempt.timeStamp);
		return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
	}, [taskAttempt]);

	if (taskAttempt === null) return <></>;

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
			<div className="pt-10 h-full">
				<div className="flex justify-between items-center px-10 py-4 bg-gray-tertiary shadow-lg">
					<div className="flex items-center gap-4">
						<img
							src={UserIcon}
							alt="Foto"
							className="rounded-full w-24"
						/>
						<div>
							<div className="text-2xl font-semibold">
								{taskAttempt.student.lastName}
							</div>
							<div className="text-base">
								{taskAttempt.student.firstName}
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4 items-end">
						<div className="text-base">{taskAttempt.task.name}</div>
						<div className="text-sm">{timeStamp}</div>
					</div>
				</div>
				<div className="px-10 py-4">
					{answersPostask && (
						<GradeGrid questionSubmissions={answersPostask} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Submission;
