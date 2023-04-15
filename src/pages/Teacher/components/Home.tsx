import Lottie from 'lottie-react';

// assets
import TeacherInClassroom from '@animations/TeacherInClassroom.json';

function Home() {
	const getDate = () => {
		const date = new Date().toLocaleDateString('es-ES', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});

		return date.charAt(0).toUpperCase() + date.slice(1);
	};

	return (
		<div className="px-6 pt-7 flex flex-col h-full">
			<div>
				<div className="font-semibold text-3xl">
					Bienvenido, profesor
				</div>
				<div className="text-2xl">{getDate()}</div>
			</div>
			<div className="text-center grow mx-auto h-full">
				<Lottie animationData={TeacherInClassroom} loop={true} />
			</div>
		</div>
	);
}

export default Home;
