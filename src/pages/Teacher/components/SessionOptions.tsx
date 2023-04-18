import ButtonPrimary from '@components/ButtonPrimary';

import Flags from '@icons/Flags.svg';

function SessionOptions({
	isSessionCreated,
	isSessionStarted,
	handleCreateSession,
	handleStartSession,
	handleEndSession
}: {
	isSessionCreated: boolean;
	isSessionStarted: boolean;
	handleCreateSession: Function;
	handleStartSession: Function;
	handleEndSession: Function;
}) {
	return (
		<>
			{!isSessionCreated ? (
				<ButtonPrimary
					onClick={handleCreateSession}
					bgColor="green-tertiary"
				>
					Activar
				</ButtonPrimary>
			) : (
				<div className="flex gap-3">
					<ButtonPrimary
						onClick={handleEndSession}
						bgColor="red-primary"
					>
						Terminar
					</ButtonPrimary>
					<ButtonPrimary
						onClick={handleStartSession}
						bgColor="green-primary"
						paddingX={!isSessionStarted}
					>
						{!isSessionStarted ? (
							'Iniciar'
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
					</ButtonPrimary>
				</div>
			)}
		</>
	);
}

export default SessionOptions;
