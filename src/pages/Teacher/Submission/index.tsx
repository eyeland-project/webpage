import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import useTeacherContext from '@hooks/useTeacherContext';
import useCourse from '@hooks/useCourse';
import useTaskAttempt from '@hooks/useTaskAttempt';
import useAnswer from '@hooks/useAnswer';
import { useTranslation } from 'react-i18next';

import Ribbon from '@pages/Teacher/components/Ribbon';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';

import UserIcon from '@icons/User.svg';
import GradePanel from './components/GradePanel';
import { parseStudentName } from '@utils/general.utils';

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

	const { t } = useTranslation('', { keyPrefix: 'teacher.submission' });

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
		return new Date(taskAttempt.timeStamp).toLocaleString();
	}, [taskAttempt]);

	const gradeMean = useMemo(() => {
		if (!answersPostask?.length) return '-';
		const questionsAnswered = answersPostask
			.map(({ answers, ...fields }) => ({
				answers: answers.filter(({ gradeAnswer }) => gradeAnswer),
				...fields
			}))
			.filter(({ answers }) => answers.length);
		if (!questionsAnswered?.length) return '-';

		return (
			questionsAnswered.reduce(
				(acc, curr) =>
					acc +
					curr.answers.reduce((acc, curr) => {
						return acc + curr.gradeAnswer!.grade;
					}, 0) /
						curr.answers.length,
				0
			) / questionsAnswered.length
		).toFixed(1);
	}, [answersPostask]);

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
						{`${t('ribbon')} #${taskAttempt.id}`}
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
							<div className="text-base">{t('sendBy')}</div>
							<div className="text-xl font-medium">
								{parseStudentName(
									taskAttempt.student.firstName,
									taskAttempt.student.lastName
								)}
							</div>
						</div>
					</div>
					<div className="flex flex-col items-end justify-between gap-4">
						<div className="text-4xl font-medium">{`${gradeMean}/100`}</div>
						<div className="flex flex-col items-end">
							<div className="text-sm flex gap-1">
								<div className="font-medium">{`Task ${taskAttempt.task.taskOrder}:`}</div>
								{taskAttempt.task.name}
							</div>
							<div className="text-xs flex gap-1">
								<div className="font-medium">{t('sentOn')}</div>
								{timeStamp}
							</div>
						</div>
					</div>
				</div>
				<div className="px-10 pt-4 pb-10 h-full">
					{answersPostask &&
						idCourse !== null &&
						idTaskAttempt !== null && (
							<GradePanel
								questionSubmissions={answersPostask}
								setQuestionSubmissions={setAnswersPostask}
								idCourse={idCourse}
								idTaskAttempt={idTaskAttempt}
							/>
						)}
				</div>
			</div>
		</div>
	);
}

export default Submission;
