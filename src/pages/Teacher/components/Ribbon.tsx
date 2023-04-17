import { ReactNode } from 'react';

function Ribbon({
	children,
	bgColor
}: {
	children?: ReactNode;
	bgColor?: string;
}) {
	return (
		<div
			className={`fixed w-full flex gap-2 items-center px-5 py-2 z-10 bg-${
				bgColor || 'green-quaternary'
			}`}
		>
			{children}
		</div>
	);
}

export default Ribbon;
