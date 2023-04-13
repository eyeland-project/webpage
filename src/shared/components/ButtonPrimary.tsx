function ButtonPrimary({
	text,
	color,
	bgColor,
	size,
	shadow = true,
	onClick
}: {
	text: string;
	color?: string;
	bgColor?: string;
	size?: 'small' | 'medium' | 'large';
	shadow?: boolean;
	onClick?: Function;
}) {
	return (
		<div
			className={`cursor-pointer rounded-lg font-semibold hover:brightness-110
			${bgColor ? `bg-${bgColor}` : 'bg-greenPrimary'}
			${shadow ? 'shadow-md' : ''}
			`}
			style={{
				color: color || 'white',
				padding:
					size === 'small'
						? '0.5rem 1rem'
						: size === 'large'
						? '.7rem 3rem'
						: '.47rem 2rem',
				fontSize:
					size === 'small'
						? '0.75rem'
						: size === 'large'
						? '1.25rem'
						: '1rem'
			}}
			onClick={(e) => onClick && onClick(e)}
		>
			{text}
		</div>
	);
}

export default ButtonPrimary;
