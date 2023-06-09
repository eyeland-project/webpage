import { useState } from 'react';
import Lottie from 'lottie-react';

import OptionList from './OptionList';

import { QuestionDetail } from '@interfaces/teacher/Question.interface';
import { characters } from '@constants/character.constant';

import QuestionMark from '@icons/QuestionMark.svg';
import Microphone from '@icons/Microphone.svg';
import Pencil from '@icons/Pencil.svg';

function QuestionTypeOpen({ question }: { question: QuestionDetail }) {
	const [showHelp, setShowHelp] = useState(true);

	const { options, character, content } = question;

	const handleToggleHelp = () => {
		setShowHelp(!showHelp);
	};

	return (
		<div className="rounded-lg shadow-xl px-5 py-6 flex flex-col gap-6 hover:scale-105 transition-transform duration-150">
			<div className="flex justify-between items-start">
				<Lottie
					animationData={characters[character!]}
					loop
					className="min-w-[64px] max-w-[64px] rounded-full grow"
				/>
				<div className="relative bg-gray-100 text-sm px-2 py-3 rounded-lg">
					<div className="absolute w-0 h-0 border-solid border-transparent border-t-8 border-b-8 border-r-8 border-r-gray-100 -translate-x-full top-2 left-0" />
					{content}
				</div>
			</div>
			<div className="flex flex-col gap-12">
				<span className="flex gap-1 items-center">
					<div className="font-semibold">Respuesta</div>
					<div className="relative">
						<img
							src={QuestionMark}
							alt="Ayuda"
							className="w-4 cursor-pointer"
							onClick={handleToggleHelp}
						/>
						<div
							className={`absolute top-0 right-0 translate-x-full ${
								showHelp ? '' : 'hidden'
							}`}
						>
							<div className="relative bg-gray-100 text-xs px-2 py-1 rounded-md w-32">
								<div className="absolute w-0 h-0 border-solid border-transparent border-t-8 border-b-8 border-r-8 border-r-gray-100 -translate-x-full top-2 left-0" />
								<div>
									<span className="text-red-primary">
										Ayuda:
									</span>{' '}
									Hi, my name is _, I live in barranquilla and
									I like to study
								</div>
							</div>
						</div>
					</div>
				</span>
				<div className="flex gap-2 justify-around">
					<img
						src={Microphone}
						alt="Grabar audio"
						className="w-1/3 cursor-pointer mx-auto mt-4"
					/>
					<img
						src={Pencil}
						alt="Grabar audio"
						className="w-1/3 cursor-pointer mx-auto mt-4"
					/>
				</div>
			</div>
		</div>
	);
}

export default QuestionTypeOpen;
