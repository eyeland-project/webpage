import { ReactNode } from 'react';

interface ButtonPrimaryProps {
	children?: ReactNode;
	color?: string;
	bgColor?: string;
	size?: 'small' | 'medium' | 'large';
	shadow?: boolean;
	paddingX?: boolean;
	paddingY?: boolean;
	width?: string;
	height?: string;
	onClick?: Function;
}

function ButtonPrimary({
	children,
	color,
	bgColor,
	size = 'medium',
	shadow = true,
	paddingX = true,
	paddingY = true,
	width,
	height,
	onClick
}: ButtonPrimaryProps) {
	const getPaddingX = () => {
		if (!paddingX) return '';
		switch (size) {
			case 'small':
				return 'px-6';
			case 'large':
				return 'px-12';
			default:
				return 'px-8';
		}
	};

	const getPaddingY = () => {
		if (!paddingY) return '';
		switch (size) {
			case 'small':
				return 'py-2';
			case 'large':
				return 'py-3';
			default:
				return 'py-2';
		}
	};

	const getFontSize = () => {
		switch (size) {
			case 'small':
				return 'text-xs';
			case 'large':
				return 'text-xl';
			default:
				return 'text-base';
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (onClick) onClick(e);
	};

	const baseClassName =
		'cursor-pointer rounded-lg font-semibold hover:brightness-110 transition-[padding] duration-200';

	const colorClass = color ? `text-${color}` : 'text-white';
	const bgColorClass = bgColor ? `bg-${bgColor}` : 'bg-green-primary';
	const widthClass = width ? `w-${width}` : 'w-auto';
	const heightClass = height ? `h-${height}` : 'h-auto';

	return (
		<div
			className={`
				${baseClassName} 
				${bgColorClass} 
				${colorClass} 
				${shadow ? 'shadow-md' : ''} 
				${getPaddingX()} 
				${getPaddingY()} 
				${widthClass} 
				${heightClass} 
				${getFontSize()}
				`}
			onClick={handleClick}
		>
			{children}
		</div>
	);
}

export default ButtonPrimary;
