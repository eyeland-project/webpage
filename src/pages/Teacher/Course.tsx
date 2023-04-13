import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Loading from 'react-loading';

import useCourses from '@hooks/useCourses';
import useTeacherContext from '@hooks/useTeacherContext';

import ButtonPrimary from '@components/ButtonPrimary';

import useTeamsMock from '@mocks/hooks/useTeams.mock';

import { TeamDetail } from '@interfaces/Team.interface';
import { Power } from '@enums/Team.enum';

import { connect, socket } from '@utils/socket';
import { parseStudentName } from '@utils/studentUtils';

import desktopAndMobile from '@animations/DesktopAndMobile.json';
import useAuthStorage from '@hooks/useAuthStorage';
import { SocketEvents } from '@enums/Socket.enum';
import useTeams from '@hooks/useTeams';

import Add from '@icons/Add.svg';
import Flags from '@icons/Flags.svg';
import MemoryPro from '@icons/MemoryPro.svg';
import SuperHearing from '@icons/SuperHearing.svg';
import SuperRadar from '@icons/SuperRadar.svg';

function Course() {
	const authStorage = useAuthStorage();

	const {
		coursesData: { idSelectedCourse }
	} = useTeacherContext();

	const {
		course,
		getCourse,
		loading: loadingCourses,
		createSession,
		startSession,
		endSession
	} = useCourses();

	const {
		teams: teamsFetched,
		getTeams,
		generateTeams,
		loading: loadingTeams
	} = useTeams();
	// const { teams: teamsMock, getTeams: getTeamsMock } = useTeamsMock();

	const [teams, setTeams] = useState<TeamDetail[]>([]);
	const [isSessionCreated, setSessionCreated] = useState(false);
	const [isSessionStarted, setSessionStarted] = useState(false);

	useEffect(() => {
		if (idSelectedCourse !== null) {
			getCourse(idSelectedCourse).catch(() => { });
		}
	}, [idSelectedCourse]);

	const handleCreateSession = async () => {
		try {
			if (idSelectedCourse !== null) {
				await createSession(idSelectedCourse);
				setSessionCreated(true);
			}
		} catch (err) { }
	};

	const handleStartSession = async () => {
		try {
			if (idSelectedCourse !== null) {
				await startSession(idSelectedCourse);
				setSessionStarted(true);
			}
		} catch (err) { }
	};

	const handleEndSession = async () => {
		try {
			if (idSelectedCourse !== null) {
				await endSession(idSelectedCourse);
				if (isSessionStarted) setSessionStarted(false);
				setSessionCreated(false);
			}
		} catch (err) { }
	};

	const handleGenerateTeams = async () => {
		try {
			if (idSelectedCourse !== null) {
				await generateTeams(idSelectedCourse);
				await getTeams(idSelectedCourse);
			}
		} catch (err) { }
	};

	const connectSocket = () => {
		socket?.disconnect();
		connect();
		socket?.emit('join', authStorage.getAccessToken());
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
			if (idSelectedCourse !== null) {
				getTeams(idSelectedCourse).catch(() => { });
				connectSocket();
				socket?.on(
					SocketEvents.TEAMS_STUDENT_UPDATE,
					(teams: TeamDetail[]) => {
						setTeams(teams);
					}
				);
			}
		} else {
			if (teams.length) setTeams([]);
		}
		return () => {
			socket?.off(SocketEvents.TEAMS_STUDENT_UPDATE);
		};
	}, [isSessionCreated]);

	useEffect(() => {
		if (teamsFetched) {
			setTeams(teamsFetched);
		}
	}, [teamsFetched]);

	useEffect(() => {
		return () => {
			socket?.disconnect();
		};
	}, []);

	return (
		<div className="px-8 pt-4 h-full relative">
			{idSelectedCourse !== null ? (
				course ? (
					<>
						<div className="absolute top-4 right-8 flex items-stretch gap-4">
							<SessionOptions
								isSessionCreated={isSessionCreated}
								isSessionStarted={isSessionStarted}
								handleCreateSession={handleCreateSession}
								handleStartSession={handleStartSession}
								handleEndSession={handleEndSession}
							/>
						</div>
						<div className="flex flex-col h-full">
							<div>
								<div className="font-semibold text-3xl flex items-center gap-4">
									<div
										className={`rounded-full w-5 h-5 bg-${!isSessionCreated
											? 'orange-primary'
											: 'green-primary'
											}`}
									></div>
									{course.name}
								</div>
								<div className="text-xl">
									{!isSessionCreated ? (
										<span>
											El curso actualmente se encuentra{' '}
											<b>Inactivo</b>
										</span>
									) : (
										<span>
											El curso actualmente se encuentra{' '}
											<b>Activo</b>
										</span>
									)}
								</div>
							</div>
							{teams && (
								<div className="grid gap-x-6 gap-y-8 pr-32 pb-6 mt-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
									{teams.map((team, i) => (
										<TeamCard key={i} team={team} />
									))}
									<div
										className="shadow-md rounded-lg p-4 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out bg-gray-100 flex flex-col justify-center items-center border border-gray-400"
										onClick={handleGenerateTeams}
									>
										<img
											src={Add}
											alt="Volver a generar"
											className="w-2/5 h-2/5 opacity-70"
										/>
									</div>
								</div>
							)}
						</div>
					</>
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
				)
			) : (
				<div className="flex flex-col justify-center items-center w-full h-full">
					<div className="w-1/2">
						<Lottie animationData={desktopAndMobile} loop={true} />
					</div>
				</div>
			)}
		</div>
	);
}

function TeamCard({ team: { name, students } }: { team: TeamDetail }) {
	return (
		<div className="shadow-md rounded-lg p-4 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out bg-whitish">
			<div className="font-bold text-xl">{name}</div>
			<hr className="border-t-gray-600 mt-2" />
			<div className="flex flex-col gap-2 mt-4">
				{students.length ? (
					students.map(({ firstName, lastName, power, id }) => (
						<div key={id} className="flex gap-4 items-center">
							<span className="rounded-md shadow-sm p-1 w-10 h-10 bg-yellow-primary">
								{power && (
									<img
										className="w-full h-full"
										src={
											power === Power.MEMORY_PRO
												? MemoryPro
												: power === Power.SUPER_RADAR
													? SuperRadar
													: SuperHearing
										}
										alt={power}
									/>
								)}
							</span>
							<span>{parseStudentName(firstName, lastName)}</span>
						</div>
					))
				) : (
					<div className="text-center text-lg text-gray-300 font-semibold px-8">
						No hay estudiantes en este equipo
					</div>
				)}
			</div>
		</div>
	);
}

function SessionOptions({
	isSessionCreated,
	isSessionStarted,
	handleCreateSession,
	handleStartSession,
	handleEndSession
}: {
	isSessionCreated: boolean;
	isSessionStarted: boolean;
	handleCreateSession: Function;
	handleStartSession: Function;
	handleEndSession: Function;
}) {
	return (
		<>
			{!isSessionCreated ? (
				<ButtonPrimary
					onClick={handleCreateSession}
					bgColor="green-tertiary"
					size="large"
				>
					Activar
				</ButtonPrimary>
			) : (
				<>
					<ButtonPrimary
						onClick={handleEndSession}
						bgColor="red-primary"
						size="large"
					>
						Terminar
					</ButtonPrimary>
					<ButtonPrimary
						onClick={handleStartSession}
						bgColor="green-primary"
						size="large"
						paddingX={!isSessionStarted}
					>
						{!isSessionStarted ? (
							'Iniciar'
						) : (
							<div className="relative w-16 h-full text-green-primary">
								.
								<img
									src={Flags}
									alt="Iniciar"
									className="w-full h-full absolute top-0 left-0"
								/>
							</div>
						)}
					</ButtonPrimary>
				</>
			)}
		</>
	);
}

export default Course;
