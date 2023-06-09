import { useState } from 'react';

import OptionList from './OptionList';

import { QuestionDetail } from '@interfaces/teacher/Question.interface';

import CheckIcon from '@icons/Check.svg';
import XIcon from '@icons/X.svg';

function QuestionTypeFlashcard({ question }: { question: QuestionDetail }) {
	const [flip, setFlip] = useState(false);

	const { imgAlt, imgUrl, options, content } = question;
	const option = options.find(({ correct }) => correct) || options[0];

	const handleFlip = () => setFlip(!flip);

	return (
		<div className="rounded-lg shadow-xl px-5 py-6 flex flex-col gap-6 hover:scale-105 transition-transform duration-150">
			<div className="flex flex-col gap-2">
				<div className="font-bold text-sm">
					Selecciona la opción correcta para completar la frase:
				</div>
				<hr className="border-t border-gray-300" />
				<div className="font-medium text-base">{content}</div>
				{flip ? (
					<div
						className="flex justify-center items-center h-44 shadow-lg font-semibold text-xl cursor-pointer"
						onClick={handleFlip}
					>
						{option.content}
					</div>
				) : (
					<div className="cursor-pointer" onClick={handleFlip}>
						{imgUrl ? (
							<img
								src={imgUrl}
								alt={imgAlt || 'Descripción de la imagen'}
								title={imgAlt || undefined}
								className="rounded-lg h-44 object-cover"
							/>
						) : (
							<div>Imagen</div>
						)}
					</div>
				)}
			</div>
			<div className="flex gap-4 justify-center">
				<div className="bg-black rounded-lg p-3 cursor-pointer">
					<img
						src={CheckIcon}
						alt="Correcto"
						className="w-4 fill-white"
					/>
				</div>
				<div className="bg-black rounded-lg p-3 cursor-pointer">
					<img
						src={XIcon}
						alt="Incorrecto"
						className="w-4 fill-white"
					/>
				</div>
			</div>
		</div>
	);
}

export default QuestionTypeFlashcard;
