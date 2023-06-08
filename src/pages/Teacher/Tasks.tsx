import { useEffect } from 'react';
import Lottie from 'lottie-react';

import useTeacherContext from '@hooks/useTeacherContext';

import Ribbon from '@pages/Teacher/components/Ribbon';

import GraduationCap from '@icons/GraduationCap.svg';
import GirlStudyingLaptop from '@animations/GirlStudyingLaptop.json';

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
					<Lottie animationData={GirlStudyingLaptop} loop={true} />
				</div>
				<div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mt-14 sm:mt-6"></div>
			</div>
		</>
	);
}

export default Tasks;
