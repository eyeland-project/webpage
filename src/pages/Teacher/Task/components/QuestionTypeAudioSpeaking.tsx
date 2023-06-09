import { useMemo } from 'react';

import { QuestionDetail } from '@interfaces/teacher/Question.interface';
import { shuffle } from '@utils/general.utils';

import Microphone from '@icons/Microphone.svg';

function QuestionTypeAudioSpeaking({ question }: { question: QuestionDetail }) {
	const { content } = question;
	const speech = new SpeechSynthesisUtterance(content);
	speech.lang = 'en-US';

	const playAudio = () => {
		window.speechSynthesis.speak(speech);
	};

	return (
		<div className="rounded-lg shadow-xl px-5 py-6 flex flex-col gap-6 hover:scale-105 transition-transform duration-150">
			<div className="flex flex-col gap-2">
				<div className="font-bold text-sm">
					Grábate diciendo la frase:
				</div>
				<hr className="border-t border-gray-300" />
				<div
					className="shadow-lg px-4 py-2 cursor-pointer"
					onClick={playAudio}
				>
					<div className="w-0 h-0 border-solid border-transparent border-t-8 border-b-8 border-l-8 border-l-black" />
				</div>
			</div>
			<div className="flex flex-col gap-8">
				<div className="font-semibold">Grabación</div>
				<img
					src={Microphone}
					alt="Grabar audio"
					className="w-2/5 cursor-pointer mx-auto mt-4"
				/>
			</div>
		</div>
	);
}

export default QuestionTypeAudioSpeaking;
