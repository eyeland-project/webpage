import { useTranslation } from 'react-i18next';

import Lottie from 'lottie-react';

import TeacherInClassroom from '@animations/TeacherInClassroom.json';

function Home() {
	const { t, i18n } = useTranslation('', { keyPrefix: 'teacher.home' });

	const getDate = () => {
		const date = new Date().toLocaleDateString(
			i18n.language === 'en' ? 'en-US' : 'es-CO',
			{
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}
		);

		return date.charAt(0).toUpperCase() + date.slice(1);
	};

	return (
		<div className="px-6 pt-7 flex flex-col h-full">
			<div>
				<div className="font-semibold text-3xl">{t('welcome')}</div>
				<div className="text-2xl">{getDate()}</div>
			</div>
			<div className="text-center grow mx-auto h-full">
				<Lottie animationData={TeacherInClassroom} loop={true} />
			</div>
		</div>
	);
}

export default Home;
