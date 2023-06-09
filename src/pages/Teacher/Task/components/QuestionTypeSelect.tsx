import Lottie from 'lottie-react';

import QuestionContentInteractive from './QuestionContentInteractive';

import { QuestionDetail } from '@interfaces/teacher/Question.interface';
import { characters } from '@constants/character.constant';

function QuestionTypeSelect({ question }: { question: QuestionDetail }) {
	const { imgAlt, imgUrl, options, character } = question;
	const contentSplitted = question.content.split('\\');

	return (
		<div className="rounded-lg shadow-xl px-5 py-6 flex flex-col gap-6 hover:scale-105 transition-transform duration-150">
			<div className="flex flex-col gap-2">
				{contentSplitted.length === 1 ? (
					<>
						<div className="font-bold text-sm">
							Selecciona la opción correcta:
						</div>
						<hr className="border-t border-gray-300" />
					</>
				) : (
					<div className="flex gap-0 justify-between items-start">
						<Lottie
							animationData={characters[character!]}
							loop
							className="min-w-[64px] max-w-[64px] rounded-full grow"
						/>
						<div className="relative bg-gray-100 text-sm px-2 py-3 rounded-lg">
							<div className="absolute w-0 h-0 border-solid border-transparent border-t-8 border-b-8 border-r-8 border-r-gray-100 -translate-x-full top-2 left-0"></div>
							{contentSplitted[0]}
						</div>
					</div>
				)}

				<div className="font-medium text-base">
					<QuestionContentInteractive question={question} />
				</div>
				{imgUrl ? (
					<img
						src={imgUrl}
						alt={imgAlt || 'Descripción de la imagen'}
						title={imgAlt || undefined}
						className="rounded-lg"
					/>
				) : null}
			</div>
			<div className="flex flex-col gap-2">
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
		</div>
	);
}

export default QuestionTypeSelect;
