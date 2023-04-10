interface Props {
	title: string;
	description: string;
	img: string;
	index: number;
	setClassPowerD: React.Dispatch<React.SetStateAction<string>>;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	classPowerD: string;
	classPower: string;
	setClassPower: React.Dispatch<React.SetStateAction<string>>;
}

function Power({
	title,
	description,
	img,
	index,
	setClassPowerD,
	setCounter,
	classPowerD,
	classPower,
	setClassPower
}: Props) {
	return (
		<>
			<div
				className={`relative rounded-lg bg-cuaternary p-3 shadow-lg transition-all duration-500 ease-in-out hover:cursor-pointer ${classPower}`}
				onMouseEnter={() => {
					setClassPowerD('opacity-100');
					setClassPower('scale-110');
					setCounter(index);
				}}
			>
				<img
					src={img}
					alt={title}
					className="h-12 w-12 md:h-16 md:w-16"
				/>
				<div
					className={`absolute mt-10 hidden w-96 px-5 text-center transition-all duration-500 ease-in-out md:block md:-translate-x-[41%] ${classPowerD}`}
				>
					<h3 className="mb-2 text-2xl font-bold">{title}</h3>
					<p className="text-base font-light">{description}</p>
				</div>
			</div>
			<div
				className={`absolute mt-24 w-96 px-5 text-center transition-all duration-500 ease-in-out md:hidden md:-translate-x-[41%] ${classPowerD}`}
			>
				<h3 className="mb-2 text-xl font-bold">{title}</h3>
				<p className="text-sm font-light">{description}</p>
			</div>
		</>
	);
}

export default Power;
