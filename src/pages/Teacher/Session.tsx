import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import Loading from 'react-loading';

import useCourse from '@hooks/useCourse';
import useTeacherContext from '@hooks/useTeacherContext';
import useTeam from '@hooks/useTeam';
import useAuthStorage from '@hooks/useAuthStorage';

import SessionPanel from '@pages/Teacher/components/SessionPanel';
import Ribbon from '@pages/Teacher/components/Ribbon';
import TeamGrid from '@pages/Teacher/components/TeamGrid';

import { TeamDetail } from '@interfaces/teacher/Team.interface';
import { TaskDetail } from '@interfaces/teacher/Task.interface';
import { SocketEvents } from '@enums/Socket.enum';

import { parseNumericParam } from '@utils/routing.utils';
import { connect, socket } from '@listeners/socket';

import DataGridIcon from '@icons/DataGrid.svg';
import PulseGray from '@animations/PulseGray.json';
import { decodeToken } from '@utils/auth';
import Button from '@components/Button';

function Session() {
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
	// useTeams hook
	const {
		teams,
		setTeams,
		getTeams,
		generateTeams
		// loading: loadingTeams
	} = useTeam();

	// states
	const [isSessionCreated, setSessionCreated] = useState(false);
	const [isSessionStarted, setSessionStarted] = useState(false);
	const [idCourse, setIdCourse] = useState<number | null>(
		parseNumericParam(searchParams.get('idCourse'))
	);
	const [task, setTask] = useState<TaskDetail | null>(null);

	const handleCreateSession = async () => {
		try {
			if (idCourse !== null) {
				await createSession(idCourse);
				setSessionCreated(true);
			}
		} catch (err) {}
	};

	const handleStartSession = async () => {
		try {
			if (idCourse !== null) {
				await startSession(idCourse);
				setSessionStarted(true);
			}
		} catch (err) {}
	};

	const handleEndSession = async () => {
		try {
			if (idCourse !== null) {
				await endSession(idCourse);
				if (isSessionStarted) setSessionStarted(false);
				setSessionCreated(false);
			}
		} catch (err) {}
	};

	const handleGenerateTeams = async () => {
		try {
			if (idCourse !== null) {
				await generateTeams(idCourse);
				await getTeams(idCourse);
			}
		} catch (err) {}
	};

	const connectSocket = () => {
		socket?.disconnect();
		const decoded = decodeToken(authStorage.getAccessToken());
		if (!decoded) return;
		connect();
		socket?.emit(SocketEvents.JOIN, decoded.id);
		console.log('connected');
	};

	const getFilteredTeams = () => {
		if (!teams) return [];
		if (!task) return teams;
		return teams.filter(({ taskOrder }) => taskOrder === task?.taskOrder);
	};

	useEffect(() => {
		if (!course) {
			if (isSessionCreated) setSessionCreated(false);
			if (isSessionStarted) setSessionStarted(false);
		} else {
			const { session } = course;
			if (session && !isSessionCreated) {
				setSessionCreated(true);
			} else if (!session) {
				if (isSessionCreated) setSessionCreated(false);
				if (isSessionStarted) setSessionStarted(false);
			}
		}
	}, [course]);

	useEffect(() => {
		if (isSessionCreated) {
			if (idCourse !== null) {
				getTeams(idCourse).catch(console.log);
				connectSocket();
				socket?.on(
					SocketEvents.TEAMS_STUDENT_UPDATE,
					(teams: TeamDetail[]) => {
						console.log('teams updated');

						setTeams(teams);
					}
				);
			}
		} else {
			if (teams?.length) setTeams([]);
		}
		return () => {
			socket?.off(SocketEvents.TEAMS_STUDENT_UPDATE);
			console.log('Stop listening to teams update');
		};
	}, [isSessionCreated]);

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
			Promise.allSettled([getCourse(idCourse), getTeams(idCourse)]).then(
				([courseSettled, teamsSettled]) => {
					if (courseSettled.status === 'fulfilled') {
						setCourse(courseSettled.value);
						if (teamsSettled.status === 'fulfilled') {
							setTeams(teamsSettled.value);
						}
					} else {
						if (course !== null) setCourse(null);
						if (teams?.length) setTeams([]);
					}
				}
			);
		}
	}, [idCourse]);

	useEffect(() => {
		return () => {
			socket?.disconnect();
			console.log('disconnected');
		};
	}, []);

	if (idCourse === null) return <></>;

	return (
		<div className="h-screen">
			<Ribbon
				bgColor={isSessionCreated ? 'green-quaternary' : 'gray-primary'}
			>
				{course ? (
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
				) : (
					<div className="text-gray-primary">.</div>
				)}
			</Ribbon>
			<div className="pt-12 h-full relative">
				{course ? (
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
								<Button onClick={handleCreateSession}>
									¡Activar!
								</Button>
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
						{loadingCourses ? (
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

export default Session;
