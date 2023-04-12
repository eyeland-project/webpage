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
			className="cursor-pointer rounded-lg font-semibold"
			style={{
				backgroundColor: bgColor || Colors.GREEN_SECONDARY,
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
		>
			{text}
		</div>
	);
}

export default ButtonPrimary;
