import useCourses from '@hooks/useCourses';
import { useEffect, useState } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';
import { Link } from 'react-router-dom';

function Course() {
	const {
		getCourses,
		courses,
		loading,
		error,
		createSession,
		startSession,
		endSession
	} = useCourses();
	const [selectedCourseId, setSelectedCourseId] = useState(null);
	const [sessionCreated, setSessionCreated] = useState(false);
	const [sessionStarted, setSessionStarted] = useState(false);
	const authStorage = useAuthStorage();

	useEffect(() => {
		getCourses();
	}, []);

	const handleCourseSelection = (event: any) => {
		setSelectedCourseId(event.target.value);
		setSessionCreated(false); // Reset sessionCreated state when course is changed
	};

	const handleCreateSession = async () => {
		if (selectedCourseId) {
			await createSession(selectedCourseId);
			setSessionCreated(true); // Set sessionCreated state to true after creating session
		}
	};

	return <></>;

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

export default Course;
