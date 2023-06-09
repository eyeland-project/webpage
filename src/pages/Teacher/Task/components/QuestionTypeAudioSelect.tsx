import OptionList from './OptionList';

import { QuestionDetail } from '@interfaces/teacher/Question.interface';

import AudioPlaying from '@icons/AudioPlaying.svg';

function QuestionTypeAudioSelect({ question }: { question: QuestionDetail }) {
	const { options } = question;

	return (
		<div className="rounded-lg shadow-xl px-5 py-6 flex flex-col gap-6 hover:scale-105 transition-transform duration-150">
			<div className="flex flex-col gap-2">
				<div className="font-bold text-sm">
					Selecciona la opción correcta para completar la frase:
				</div>
				<hr className="border-t border-gray-300" />
				<img
					src={AudioPlaying}
					alt="Reproducir audio"
					className="w-2/5 cursor-pointer mx-auto mt-4"
				/>
			</div>
			<OptionList options={options} />
		</div>
	);
}

export default QuestionTypeAudioSelect;
