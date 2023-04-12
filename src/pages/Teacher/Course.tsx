import useCourses from '@hooks/useCourses';
import { useEffect, useState } from 'react';
import useTeacherContext from '@hooks/useTeacherContext';
import ButtonPrimary from '@components/ButtonPrimary';
import useTeams from '@hooks/useTeams';
import useTeamsMock from '@mocks/hooks/useTeams.mock';
import { TeamDetail } from '@interfaces/Team.interface';
import { Power } from '@enums/Team.enum';
import { parseStudentName } from '@utils/studentUtils';

function Course() {
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

	const { teams, getTeams, initTeams, loading: loadingTeams } = useTeams();
	const { teams: teamsMock, getTeams: getTeamsMock } = useTeamsMock();

	const [isSessionCreated, setSessionCreated] = useState(false);
	const [isSessionStarted, setSessionStarted] = useState(false);

	useEffect(() => {
		if (idSelectedCourse === null) return;
		getCourse(idSelectedCourse).catch(() => {});
	}, [idSelectedCourse]);

	const handleCreateSession = async () => {
		if (idSelectedCourse) {
			createSession(idSelectedCourse)
				.then(() => {
					setSessionCreated(true); // Set sessionCreated state to true after creating session
				})
				.catch(() => {});
		}
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
		if (!idSelectedCourse) return;
		getTeamsMock(idSelectedCourse).catch(() => {});
	}, [isSessionCreated]);

	return (
		<div className="px-8 pt-4 h-full relative">
			{idSelectedCourse !== null ? (
				course ? (
					<>
						<div className="absolute top-4 right-8">
							{!isSessionCreated ? (
								<ButtonPrimary
									text="Activar"
									onClick={handleCreateSession}
									bgColor="greenTertiary"
									size="large"
								/>
							) : !isSessionStarted ? (
								<ButtonPrimary
									text="¡Empezar!"
									// onClick={startSession}
									bgColor="greenPrimary"
									size="large"
								/>
							) : (
								<ButtonPrimary
									text="Terminar"
									// onClick={endSession}
									bgColor="redPrimary"
									size="large"
								/>
							)}
						</div>
						<div className="flex flex-col h-full">
							<div>
								<div className="font-semibold text-3xl flex items-center gap-4">
									<div
										className={`rounded-full w-5 h-5 bg-${
											!isSessionCreated
												? 'orangePrimary'
												: 'greenPrimary'
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
							{teamsMock && (
								<div
									className="grid gap-x-6 gap-y-8 pr-32 pb-6 mt-8"
									style={{
										gridTemplateColumns:
											'repeat(auto-fit, minmax(240px, 1fr))'
									}}
								>
									{teamsMock.map((team, i) => (
										<TeamCard key={i} team={team} />
									))}
								</div>
							)}
						</div>
					</>
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</div>
	);

	// return (
	// 	<div className="h-screen flex flex-col">
	// 		{/* <div className="bg-gray-100 p-4 border-b border-gray-200">
	// 			<Link
	// 				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
	// 				onClick={() => {
	// 					authStorage.removeAccessToken();
	// 				}}
	// 				to={'/login'}
	// 			>
	// 				Cerrar sesión
	// 			</Link>
	// 		</div> */}
	// 		{!courses || loading ? (
	// 			<div className="text-center mt-4 text-xl">Loading...</div>
	// 		) : (
	// 			<div className="flex-grow flex justify-center items-center">
	// 				<div className="w-full max-w-sm">
	// 					{!sessionCreated && !sessionStarted && (
	// 						<>
	// 							<label
	// 								htmlFor="courses"
	// 								className="block text-gray-700 text-sm font-bold mb-2"
	// 							>
	// 								Selecciona un curso:
	// 							</label>
	// 							<select
	// 								name="courses"
	// 								id="courses"
	// 								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
	// 								onChange={handleCourseSelection}
	// 							>
	// 								<option value="">Select a course</option>
	// 								{courses.map((course, index) => (
	// 									<option value={course.id} key={index}>
	// 										{course.name}
	// 									</option>
	// 								))}
	// 							</select>
	// 						</>
	// 					)}
	// 					{!sessionCreated ? ( // Conditionally render button based on sessionCreated state
	// 						<button
	// 							className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
	// 							onClick={handleCreateSession}
	// 							disabled={!selectedCourseId}
	// 						>
	// 							Crear sesión
	// 						</button>
	// 					) : (
	// 						<div className="flex">
	// 							{!sessionStarted ? (
	// 								<button
	// 									className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
	// 									onClick={() => {
	// 										if (selectedCourseId)
	// 											startSession(selectedCourseId);
	// 										setSessionStarted(true);
	// 									}}
	// 								>
	// 									Iniciar
	// 								</button>
	// 							) : (
	// 								<button
	// 									className="ml-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
	// 									onClick={() => {
	// 										if (selectedCourseId)
	// 											endSession(selectedCourseId);
	// 										setSessionCreated(false);
	// 										setSessionStarted(false);
	// 									}}
	// 								>
	// 									Terminar
	// 								</button>
	// 							)}
	// 						</div>
	// 					)}
	// 				</div>
	// 			</div>
	// 		)}
	// 	</div>
	// );
}

function TeamCard({ team: { name, students } }: { team: TeamDetail }) {
	return (
		<div className="shadow-md rounded-lg p-4 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out bg-whitish">
			<div className="font-bold text-xl">{name}</div>
			<hr className="border-t-black" />
			<div className="flex flex-col gap-2 mt-4">
				{students.map(({ firstName, lastName, power, id }) => (
					<div key={id} className="flex gap-4 items-center">
						<span className="rounded-md shadow-sm p-1 w-10 h-10 bg-yellowPrimary">
							{power && (
								<img
									className="w-full h-full"
									src={`src/assets/icons/${
										power === Power.MEMORY_PRO
											? 'MemoryPro'
											: power === Power.SUPER_RADAR
											? 'SuperRadar'
											: 'SuperHearing'
									}.svg`}
									alt={power}
								/>
							)}
						</span>
						<span>{parseStudentName(firstName, lastName)}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default Course;
