import { Option } from '@interfaces/teacher/Option.interface';

function OptionList({
	options,
	horizontal = false
}: {
	options: Option[];
	horizontal?: boolean;
}) {
	return (
		<div
			className={`flex gap-2 ${
				horizontal ? 'justify-around' : 'flex-col'
			}`}
		>
			{options.map(({ content, correct, feedback }, index) => (
				<div
					key={index}
					className={`text-white text-center px-4 py-2 rounded-md cursor-pointer ${
						correct ? 'bg-green-quinary' : 'bg-black'
					}`}
					title={feedback}
				>
					{content}
				</div>
			))}
		</div>
	);
}

export default OptionList;
