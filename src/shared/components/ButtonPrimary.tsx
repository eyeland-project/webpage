import { ReactNode } from 'react';

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
}: {
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
}) {
	return (
		<div
			className={`cursor-pointer rounded-lg font-semibold hover:brightness-110 transition-[padding] duration-200
			${bgColor ? `bg-${bgColor}` : 'bg-green-primary'}
			${shadow ? 'shadow-md' : ''}
			${
				paddingX
					? size === 'small'
						? 'px-4'
						: size === 'large'
						? 'px-12'
						: 'px-8'
					: ''
			}
			${
				paddingY
					? size === 'small'
						? 'py-2'
						: size === 'large'
						? 'py-3'
						: 'py-2'
					: ''
			}
			`}
			style={{
				color: color || 'white',
				width: width || 'fit-content',
				height: height || 'fit-content',
				// padding: padding
				// 	? size === 'small'
				// 		? '0.5rem 1rem'
				// 		: size === 'large'
				// 		? '.7rem 3rem'
				// 		: '.47rem 2rem'
				// 	: '',
				fontSize:
					size === 'small'
						? '0.75rem'
						: size === 'large'
						? '1.25rem'
						: '1rem'
			}}
			onClick={(e) => onClick && onClick(e)}
		>
			{children}
		</div>
	);
}

export default ButtonPrimary;
