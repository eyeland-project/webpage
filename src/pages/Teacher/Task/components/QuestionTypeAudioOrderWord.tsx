import { useMemo } from 'react';
import { QuestionDetail } from '@interfaces/teacher/Question.interface';
import { shuffle } from '@utils/general.utils';

function QuestionTypeAudioOrderWord({
	question
}: {
	question: QuestionDetail;
}) {
	const { options, content, imgAlt, imgUrl } = question;
	const words = useMemo(() => shuffle(options[0].content.split('')), []);
	const speech = new SpeechSynthesisUtterance(content);
	speech.lang = 'en-US';

	const playAudio = () => {
		window.speechSynthesis.speak(speech);
	};

	return (
		<div className="rounded-lg shadow-xl px-5 py-6 flex flex-col gap-6 hover:scale-105 transition-transform duration-150">
			<div className="flex flex-col gap-2">
				<div className="font-bold text-sm">
					Describe la imagen ordenando las letras:
				</div>
				<hr className="border-t border-gray-300" />
				{imgUrl ? (
					<img
						src={imgUrl}
						alt={imgAlt || 'Descripción de la imagen'}
						title={imgAlt || undefined}
						className="rounded-lg"
					/>
				) : null}
				<div
					className="shadow-lg px-4 py-2 cursor-pointer"
					onClick={playAudio}
				>
					<div className="w-0 h-0 border-solid border-transparent border-t-8 border-b-8 border-l-8 border-l-black" />
				</div>
				<div className="rounded-lg border-solid border border-black text-center p-6 cursor-default font-semibold text-gray-400">
					Pulsa las letras para formar la palabra
				</div>
			</div>
			<div className="flex gap-1 flex-wrap">
				{words.map((word, index) => (
					<div
						key={index}
						className="text-white text-center px-3 py-1 rounded-md cursor-pointer bg-black"
					>
						{word}
					</div>
				))}
			</div>
		</div>
	);
}

export default QuestionTypeAudioOrderWord;
