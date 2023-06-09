import Loading from 'react-loading';
import { useTranslation } from 'react-i18next';

function LoadingScreen({ loading }: { loading: boolean }) {
	const { t } = useTranslation('', { keyPrefix: 'teacher.loading' });

	return (
		<div className="flex flex-col grow justify-center items-center h-full">
			{loading ? (
				<Loading type="spin" color="#0D9748" />
			) : (
				<div className="italic w-3/5 text-center text-lg">
					{t('error')}
				</div>
			)}
		</div>
	);
}

export default LoadingScreen;
