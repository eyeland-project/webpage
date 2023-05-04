import { useState } from 'react';

import ConfirmDialog from '@components/ConfirmDialog';

const useConfirmDialog = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [callbackConfirm, setCallbackConfirm] = useState<
		(() => void) | undefined
	>(undefined);
	const [callbackClose, setCallbackClose] = useState<
		(() => void) | undefined
	>(undefined);
	const [message, setMessage] = useState<string | undefined>(undefined);
	const [title, setTitle] = useState<string | undefined>(undefined);
	const [confirmText, setConfirmText] = useState<string | undefined>(
		undefined
	);
	const [closeText, setCloseText] = useState<string | undefined>(undefined);

	const handleConfirm = () => {
		setIsOpen(false);
		if (callbackConfirm) callbackConfirm();
	};

	const handleClose = () => {
		setIsOpen(false);
		if (callbackClose) callbackClose();
	};

	const showDialog = ({
		title,
		message,
		onConfirm,
		onClose,
		confirmText,
		closeText
	}: {
		title?: string;
		message?: string;
		onConfirm: () => void;
		onClose?: () => void;
		confirmText?: string;
		closeText?: string;
	}) => {
		if (title) setTitle(title);
		if (confirmText) setConfirmText(confirmText);
		if (closeText) setCloseText(closeText);
		if (message) setMessage(message);
		if (onClose) setCallbackClose(() => onClose);
		setCallbackConfirm(() => onConfirm);
		setIsOpen(true);
	};

	function ConfirmDialogComponent() {
		return ConfirmDialog({
			title,
			confirmText,
			closeText,
			isOpen,
			message,
			onConfirm: handleConfirm,
			onClose: handleClose
		});
	}

	return {
		showDialog,
		ConfirmDialog: ConfirmDialogComponent
	};
};

export default useConfirmDialog;
