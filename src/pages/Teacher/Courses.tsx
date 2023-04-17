import { useEffect } from 'react';
import Lottie from 'lottie-react';

import useCourses from '@hooks/useCourses';
import useTeacherContext from '@hooks/useTeacherContext';

import useAuthStorage from '@hooks/useAuthStorage';

import FormCourse from './components/FormCourse';

import GraduationCap from '@icons/GraduationCap.svg';
import Mail from '@icons/Mail.svg';
import Location from '@icons/Location.svg';
import Website from '@icons/Website.svg';
import Phone from '@icons/Phone.svg';
import FlyingStudents from '@animations/FlyingStudents.json';

function Courses() {
	// const authStorage = useAuthStorage();

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

	useEffect(() => {
		if (idSelectedCourse !== null) {
			getCourse(idSelectedCourse).catch(() => {});
		}
	}, [idSelectedCourse]);

	return (
		<>
			<div className="fixed w-full bg-green-quaternary flex gap-2 items-center px-5 py-2 z-10">
				<img
					src={GraduationCap}
					alt="GraduationCap"
					className="w-5 h-5"
				/>
				<div className="text-white font-semibold">
					Institución Educativa Distrital La Magdalena
				</div>
			</div>
			<div className="px-8 pb-6 relative">
				<div className="text-center mx-auto w-4/6">
					<Lottie animationData={FlyingStudents} loop={true} />
				</div>
				<div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mt-20">
					<FormCourse />
				</div>
				<div className="mt-20">
					<div className="font-bold text-lg">
						Información adicional
					</div>
					<div className="mt-2 font-medium flex flex-col gap-1">
						<div className="flex gap-2">
							<img src={Location} alt="Location" />
							Calle 41 #7-07, Barranquilla
						</div>
						<div className="flex gap-2">
							<img src={Phone} alt="Phone" />
							6053641256
						</div>
						<div className="flex gap-2">
							<img src={Mail} alt="Mail" />
							<a href="mailto:info@insedmag.edu.co">
								mailto:info@insedmag.edu.co
							</a>
						</div>
						<div className="flex gap-2">
							<img src={Website} alt="Website" />
							<a
								href="https://insedmag.edu.co"
								target="_blank"
								referrerPolicy="no-referrer"
							>
								https://insedmag.edu.co
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Courses;
