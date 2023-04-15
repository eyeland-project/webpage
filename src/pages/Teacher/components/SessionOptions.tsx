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
					size="large"
				>
					Activar
				</ButtonPrimary>
			) : (
				<>
					<ButtonPrimary
						onClick={handleEndSession}
						bgColor="red-primary"
						size="large"
					>
						Terminar
					</ButtonPrimary>
					<ButtonPrimary
						onClick={handleStartSession}
						bgColor="green-primary"
						size="large"
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
				</>
			)}
		</>
	);
}

export default SessionOptions;
