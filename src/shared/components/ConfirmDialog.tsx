import CloseIcon from '@icons/Close.svg';

function ConfirmDialog({
	title = 'Confirmar acción',
	message = '¿Está seguro que desea realizar esta acción?',
	onConfirm,
	onClose,
	confirmText = 'Confirmar',
	closeText = 'Cerrar',
	isOpen
}: {
	title?: string;
	message?: string;
	onConfirm: () => void;
	onClose: () => void;
	confirmText?: string;
	closeText?: string;
	isOpen: boolean;
}) {
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50
		${isOpen ? '' : 'hidden'}
		`}
		>
			<div className="bg-white rounded-lg w-1/3">
				<div className="flex flex-col items-start px-4 py-6 relative">
					<img
						src={CloseIcon}
						alt="Cerrar"
						className="w-5 h-5 absolute top-4 right-4 cursor-pointer opacity-75"
						onClick={onClose}
					/>
					<div className="flex items-center w-full text-gray-900 font-medium text-lg">
						{title}
					</div>
					<div className="flex flex-col w-full mt-4">
						<div className="text-gray-900 font-medium text-md">
							{message}
						</div>
						<div className="flex w-full mt-4 gap-2">
							<button
								onClick={onClose}
								className="px-4 py-2 w-1/2 text-gray-900 font-semibold bg-gray-100 rounded-lg hover:bg-gray-200"
							>
								{closeText || 'Closear'}
							</button>
							<button
								onClick={onConfirm}
								className="px-4 py-2 w-1/2 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600"
							>
								{confirmText || 'Confirmar'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmDialog;
