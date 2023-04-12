import { Colors } from '@enums/Styles.enum';

function ButtonPrimary({
	text,
	color,
	bgColor,
	size
}: {
	text: string;
	color?: string;
	bgColor?: string;
	size?: 'small' | 'medium' | 'large';
}) {
	return (
		<div
			className="cursor-pointer rounded-lg"
			style={{
				backgroundColor: bgColor || Colors.GREEN_SECONDARY,
				padding:
					size === 'small'
						? '0.5rem 1rem'
						: size === 'medium'
						? '1rem 2rem'
						: size === 'large'
						? '1.5rem 3rem'
						: '1rem 2rem',
				fontSize:
					size === 'small'
						? '0.75rem'
						: size === 'medium'
						? '1rem'
						: size === 'large'
						? '1.25rem'
						: '1rem',
				fontWeight: 600,
				color: color || 'white'
			}}
		>
			{text}
		</div>
	);
}

export default ButtonPrimary;
