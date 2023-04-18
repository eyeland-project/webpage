import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import Loading from 'react-loading';

import useCourse from '@hooks/useCourse';
import useTeacherContext from '@hooks/useTeacherContext';
import useTeam from '@hooks/useTeam';
import useAuthStorage from '@hooks/useAuthStorage';

import Ribbon from './components/Ribbon';
import ButtonPrimary from '@components/ButtonPrimary';
import TeamGrid from '@pages/Teacher/components/TeamGrid';

import { TeamDetail } from '@interfaces/Team.interface';
import { SocketEvents } from '@enums/Socket.enum';

import { parseNumericParam } from '@utils/routing.utils';
import { connect, socket } from '@utils/socket';

import DataGridIcon from '@icons/DataGrid.svg';
import PulseGray from '@animations/PulseGray.json';
import Activity from '@animations/Activity.json';
import SessionPanel from './components/SessionPanel';
import { TaskDetail } from '@interfaces/Task.interface';

function Students() {
	// auth
	const authStorage = useAuthStorage();
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
	// useCourses hook
	const {
		getCourse,
		loading: loadingCourses,
		createSession,
		startSession,
		endSession
	} = useCourse();
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
		}
	}, [idCourse]);

	useEffect(() => {
		return () => {
			socket?.disconnect();
		};
	}, []);

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
			<div className="pt-12 h-full relative">
				{students ? (
					!isSessionCreated ? (
						<div className="shadow-card rounded-md px-14 py-6 hover:scale-105 transition-all duration-300 flex flex-col items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<Lottie
								animationData={PulseGray}
								loop
								className="w-24 h-24"
							/>
							<div className="text-green-primary text-center">
								El curso actualmente se encuentra{' '}
								<div className="font-semibold text-gray-secondary">
									Inactivo
								</div>
							</div>
							<div className="w-min">
								<ButtonPrimary
									size="medium"
									onClick={handleCreateSession}
								>
									¡Activar!
								</ButtonPrimary>
							</div>
						</div>
					) : (
						<div className="">
							<SessionPanel
								isSessionCreated={isSessionCreated}
								isSessionStarted={isSessionStarted}
								handleCreateSession={handleCreateSession}
								handleStartSession={handleStartSession}
								handleEndSession={handleEndSession}
								task={task}
								setTask={setTask}
							/>
							{teams && (
								<div
									className="
									sm:pl-6 sm:pr-16 sm:pb-10
									md:pl-6 md:pr-6 md:pb-10
									lg:pl-10 lg:pr-16 lg:pb-10
									xl:pl-12 xl:pr-40 xl:pb-10
									2xl:pr-48 2xl:pb-10
								"
								>
									<TeamGrid
										teams={getFilteredTeams()}
										handleGenerateTeams={
											handleGenerateTeams
										}
									/>
								</div>
							)}
						</div>
					)
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
