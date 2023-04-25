import { ReactNode } from 'react';
import ReactModal, { Styles } from 'react-modal';

import AddIcon from '@icons/Add.svg';

function Modal({
	isOpen,
	setIsOpen,
	styles,
	children
}: {
	isOpen: boolean;
	setIsOpen: Function;
	styles?: Styles;
	children?: ReactNode;
}) {
	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<ReactModal
			isOpen={isOpen}
			style={{
				overlay: {
					zIndex: 1000,
					transition: 'opacity 0.3s ease-in-out',
					...styles?.overlay
				},
				content: {
					margin: 'auto',
					...styles?.content
				}
			}}
		>
			<div className="relative h-full">
				<img
					src={AddIcon}
					alt="Cerrar"
					className="invert opacity-50 absolute top-0 right-0 w-8 h-8 rotate-45 cursor-pointer"
					onClick={onClose}
				/>
				{children}
			</div>
		</ReactModal>
	);
}

export default Modal;
