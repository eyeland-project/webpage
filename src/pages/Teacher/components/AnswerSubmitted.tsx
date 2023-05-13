import { Option } from '@interfaces/teacher/Option.interface';

import CheckIcon from '@icons/check.svg';
import XIcon from '@icons/x.svg';

function AnswerSubmitted({
	id,
	idOption,
	text,
	audioUrl,
	answerSeconds,
	idAnswerSelected,
	onSelectAnswer,
	options,
	answerOrder
}: {
	id: number;
	idOption: number | null;
	text: string | null;
	audioUrl: string | null;
	answerSeconds: number | null;
	idAnswerSelected: number | null;
	onSelectAnswer: (id: number) => void;
	options: Option[];
	answerOrder: number;
}) {
	const correctOption = options.find(({ correct }) => correct);
	const answeredOption = options.find(({ id }) => id === idOption);

	return (
		<div className="flex gap-2">
			<input
				type="radio"
				name="answer"
				value={answerOrder}
				className="w-4 h-4 border border-gray-primary rounded-md p-2"
				id={`answer-${answerOrder}`}
				onChange={() => onSelectAnswer(id)}
				checked={idAnswerSelected === id}
			/>
			<div
				key={answerOrder}
				className="flex flex-col gap-2 relative w-full"
			>
				{idOption !== null && (
					<div>
						<div className="flex gap-1 text-sm">
							<div className="font-medium">Opción marcada:</div>
							<div className="">
								{answeredOption?.content !== undefined ? (
									<div className="flex gap-2 items-center">
										<div>{answeredOption.content}</div>
										{answeredOption.correct ? (
											<img
												src={CheckIcon}
												alt="Correcta"
												className="w-4 h-4"
											/>
										) : (
											<img
												src={XIcon}
												alt="Incorrecta"
												className="w-3 h-3"
											/>
										)}
									</div>
								) : (
									`Opción con id ${idOption} no encontrada.`
								)}
							</div>
						</div>
						<div className="flex gap-1 text-sm">
							<div className="font-medium">Opción correcta:</div>
							<div className="">
								{correctOption?.content !== undefined
									? correctOption.content
									: `No encontrada.`}
							</div>
						</div>
					</div>
				)}
				{text !== null && (
					<div className="flex gap-1 text-sm">
						<div className="font-medium">Texto:</div>
						<div className="">{text}</div>
					</div>
				)}
				{audioUrl !== null && (
					<div className="flex gap-1 text-sm">
						<div className="font-medium">Audio:</div>
						<audio controls src={audioUrl} className="h-10" />
					</div>
				)}
				{answerSeconds !== null && (
					<div className="absolute bottom-0 right-0 flex gap-1 text-xs">
						<div className="font-medium">Tiempo:</div>
						<div className="">{answerSeconds} segundos</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AnswerSubmitted;
