import Lottie from 'lottie-react';

// assets
import teacherInClassroom from '@animations/TeacherInClassroom.json';

function Home() {
	return (
		<div className="px-6 pt-7 flex flex-col h-full max-h-full">
			<div className="">
				<div className="font-semibold text-3xl">
					Bienvenido, profesor
				</div>
				<div className="text-2xl">Abril 14, 2023</div>
			</div>
			<div className="text-center grow mx-auto h-full max-h-full">
				<Lottie animationData={teacherInClassroom} loop={true} />
			</div>
		</div>
	);
}

export default Home;
