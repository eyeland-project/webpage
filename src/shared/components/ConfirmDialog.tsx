function ConfirmDialog({
	title,
	message,
	onConfirm,
	onCancel,
	confirmText,
	cancelText
}: {
	title?: string;
	message?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
}) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
			<div className="bg-white rounded-lg w-1/3">
				<div className="flex flex-col items-start p-4">
					<div className="flex items-center w-full">
						<div className="text-gray-900 font-medium text-lg">
							{title}
						</div>
						<svg
							onClick={onCancel}
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 ml-auto cursor-pointer fill-current text-gray-700"
							viewBox="0 0 18 18"
						>
							<path
								fillRule="evenodd"
								d="M18 1.5L16.5 0 9 7.5 1.5 0 0 1.5 7.5 9 0 16.5 1.5 18 9 10.5 16.5 18 18 16.5 10.5 9z"
							/>
						</svg>
					</div>
					<div className="flex flex-col w-full mt-4">
						<div className="text-gray-900 font-medium text-md">
							{message}
						</div>
						<div className="flex w-full mt-4">
							<button
								onClick={onCancel}
								className="px-4 py-2 w-1/2 text-gray-900 font-semibold bg-gray-100 rounded-lg hover:bg-gray-200"
							>
								{cancelText || 'Cancelar'}
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
