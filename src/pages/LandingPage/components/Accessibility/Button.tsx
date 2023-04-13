interface Props {
	className: string;
	onClick: () => void;
}

function Button({ className, onClick }: Props) {
	return (
		<div
			className={'absolute h-[22%] w-[26%] cursor-pointer  ' + className}
			onClick={onClick}
		></div>
	);
}

export default Button;
