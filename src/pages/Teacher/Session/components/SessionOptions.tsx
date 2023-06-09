import Button from '@components/Button';
import Flags from '@icons/Flags.svg';

import { useTranslation } from 'react-i18next';

function SessionOptions({
	isSessionCreated,
	isSessionStarted,
	handleCreateSession,
	handleStartSession,
	handleEndSession
}: {
	isSessionCreated: boolean;
	isSessionStarted: boolean;
	handleCreateSession: () => void;
	handleStartSession: () => void;
	handleEndSession: () => void;
}) {
	const { t } = useTranslation('', {
		keyPrefix: 'teacher.session.active.buttons'
	});

	return (
		<>
			{!isSessionCreated ? (
				<Button
					onClick={handleCreateSession}
					className="bg-green-tertiary"
				>
					{t('activate')}
				</Button>
			) : (
				<div className="flex gap-3 justify-end">
					<Button
						onClick={handleEndSession}
						className="bg-red-primary"
					>
						{t('finish')}
					</Button>
					<Button
						onClick={handleStartSession}
						className={`bg-green-primary ${
							isSessionStarted ? 'px-0' : ''
						}`}
					>
						{!isSessionStarted ? (
							t('start')
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
					</Button>
				</div>
			)}
		</>
	);
}

export default SessionOptions;
