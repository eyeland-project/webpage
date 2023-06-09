import { useMemo } from 'react';
import { QuestionDetail } from '@interfaces/teacher/Question.interface';
import { shuffle } from '@utils/general.utils';

function QuestionTypeOrder({ question }: { question: QuestionDetail }) {
	const { options, content } = question;
	const words = useMemo(() => shuffle(options[0].content.split(' ')), []);

	return (
		<div className="rounded-lg shadow-xl px-5 py-6 flex flex-col gap-6 hover:scale-105 transition-transform duration-150">
			<div className="flex flex-col gap-2">
				<div className="font-bold text-sm">
					Ordena las palabras en inglés para traducir la frase:
				</div>
				<hr className="border-t border-gray-300" />
				<div className="font-medium text-base">{content}</div>
				<div className="rounded-lg border-solid border border-black text-center p-6 cursor-default font-semibold text-gray-400">
					Pulsa las palabras para organizarlas
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

export default QuestionTypeOrder;
