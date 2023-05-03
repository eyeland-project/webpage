import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
	children?: ReactNode;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Button({ children, className = '', onClick }: ButtonProps) {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (onClick) onClick(e);
	};

	const defaultClassName = `
        text-center text-white bg-green-primary rounded-lg shadow-md py-2 px-6 w-auto h-auto text-base
        cursor-pointer font-semibold hover:brightness-110 transition-[padding] duration-200
    `;

	return (
		<div
			className={twMerge(defaultClassName, className)}
			onClick={handleClick}
		>
			{children}
		</div>
	);
}

export default Button;
