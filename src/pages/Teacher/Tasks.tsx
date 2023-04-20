import { useEffect } from 'react';
import Lottie from 'lottie-react';

import useTeacherContext from '@hooks/useTeacherContext';

import Ribbon from '@pages/Teacher/components/Ribbon';

import GraduationCap from '@icons/GraduationCap.svg';
import Mail from '@icons/Mail.svg';
import Location from '@icons/Location.svg';
import Website from '@icons/Website.svg';
import Phone from '@icons/Phone.svg';
import FlyingStudents from '@animations/FlyingStudents.json';

function Tasks() {
	const {
		tasksData: { setIdSelectedTask }
	} = useTeacherContext();

	useEffect(() => {
		setIdSelectedTask(null);
	}, []);

	return (
		<>
			<Ribbon>
				<img
					src={GraduationCap}
					alt="GraduationCap"
					className="w-5 h-5"
				/>
				<div className="text-white font-semibold">
					Institución Educativa Distrital La Magdalena
				</div>
			</Ribbon>
			<div className="px-8 pb-6 relative">
				<div className="text-center mx-auto w-4/6">
					<Lottie animationData={FlyingStudents} loop={true} />
				</div>
				<div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mt-14 sm:mt-6"></div>
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

export default Tasks;
