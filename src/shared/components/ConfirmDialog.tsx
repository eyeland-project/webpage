import CloseIcon from '@icons/Close.svg';
import { useTranslation } from 'react-i18next';

function ConfirmDialog({
	title,
	message,
	onConfirm,
	onClose,
	confirmText,
	closeText,
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
	const { t } = useTranslation('', { keyPrefix: 'teacher.confirmDialog' });

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
					<div className="flex items-center w-full text-black font-bold text-xl">
						{title ? title : t('title')}
					</div>
					<div className="flex flex-col w-full mt-2">
						<div className="text-gray-900 font-medium text-md">
							{message ? message : t('message')}
						</div>
						<div className="flex w-full mt-4 gap-2">
							<button
								onClick={onClose}
								className="px-4 py-2 w-1/2 text-gray-900 font-semibold bg-gray-100 rounded-lg hover:bg-gray-200"
							>
								{closeText ? closeText : t('closeText')}
							</button>
							<button
								onClick={onConfirm}
								className="px-4 py-2 w-1/2 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600"
							>
								{confirmText ? confirmText : t('confirmText')}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmDialog;
