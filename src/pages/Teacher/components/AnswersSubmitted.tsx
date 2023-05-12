import { useMemo } from 'react';
import Collapse from 'rc-collapse';
import 'rc-collapse/assets/index.css';

import {
	AnswerDetail,
	QuestionSubmissionDetailPostask
} from '@interfaces/teacher/Answer.interface';
import { ItemType } from 'rc-collapse/es/interface';

function AnswersSubmitted({
	questionSubmission: { content, questionOrder, options, answers },
	idAnswerSelected,
	setIdAnswerSelected
}: {
	questionSubmission: QuestionSubmissionDetailPostask;
	idAnswerSelected: number | null;
	setIdAnswerSelected: (id: number) => void;
}) {
	// console.log('Question', questionOrder);
	// console.log(answers.findIndex(({ id }) => id === idAnswerSelected));

	const onSelectAnswer = (id: number) => {
		if (idAnswerSelected !== id) {
			setIdAnswerSelected(id);
		}
	};

	const collapseItems = useMemo(
		(): ItemType[] =>
			answers
				// .map((answer) => [{ ...answer }, { ...answer }])
				// .flatMap((answer) => answer)
				.map(({ audioUrl, answerSeconds, idOption, text, id }, i) => ({
					key: i,
					label: (
						<div className="font-semibold">{`Respuesta ${
							i + 1
						}`}</div>
					),
					children: (
						<div className="flex gap-2">
							<input
								type="radio"
								name="answer"
								value={i}
								className="w-4 h-4 border border-gray-primary rounded-md p-2"
								id={`answer-${i}`}
								onChange={() => onSelectAnswer(id)}
								checked={idAnswerSelected === id}
							/>
							<div
								key={i}
								className="flex flex-col gap-2 relative w-full"
							>
								{idOption !== null && (
									<div className="flex gap-1 text-sm">
										<div className="font-medium">
											Opción:
										</div>
										<div className="">
											{options.find(
												({ id }) => id === idOption
											)?.content || 'Opción marcada'}
										</div>
									</div>
								)}
								{text !== null && (
									<div className="flex gap-1 text-sm">
										<div className="font-medium">
											Texto:
										</div>
										<div className="">{text}</div>
									</div>
								)}
								{audioUrl !== null && (
									<div className="flex gap-1 text-sm">
										<div className="font-medium">
											Audio:
										</div>
										<audio
											controls
											src={audioUrl}
											className="h-10"
										/>
									</div>
								)}
								{answerSeconds !== null && (
									<div className="absolute bottom-0 right-0 flex gap-1 text-xs">
										<div className="font-medium">
											Tiempo:
										</div>
										<div className="">
											{answerSeconds} segundos
										</div>
									</div>
								)}
							</div>
						</div>
					)
				})),
		[idAnswerSelected]
	);

	return (
		<div className="flex flex-col justify-between px-4 py-2 text-sm">
			<div className="">
				<div className="font-medium text-lg">{`Pregunta ${questionOrder}`}</div>
				{content}
			</div>
			<div className="flex flex-col gap-1">
				<Collapse
					defaultActiveKey={
						answers.findIndex(
							({ id }) => id === idAnswerSelected
						) ?? undefined
					}
					items={collapseItems}
				/>
			</div>
		</div>
	);
}

const answersMock: AnswerDetail[] = [
	{
		id: 1,
		answerSeconds: 12,
		audioUrl:
			'https://storage.googleapis.com/eyeland-0/user_content/learning/submission/audio/1683819000810_audio.m4a',
		gradeAnswer: {
			id: 1,
			grade: 98,
			comment: 'Buen trabajo'
		},
		idOption: 1,
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tenetur, iste corporis, vero aut eaque architecto ratione, voluptatum et quis aspernatur dolore officia. Enim earum, ad voluptates blanditiis saepe voluptas.',
		team: null
	},
	{
		id: 2,
		answerSeconds: 4,
		audioUrl:
			'https://storage.googleapis.com/eyeland-0/user_content/learning/submission/audio/1683819000810_audio.m4a',
		gradeAnswer: null,
		idOption: 2,
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tenetur, iste corporis, vero aut eaque architecto ratione, voluptatum et quis aspernatur dolore officia. Enim earum, ad voluptates blanditiis saepe voluptas.',
		team: null
	},
	{
		id: 3,
		answerSeconds: 7,
		audioUrl: null,
		gradeAnswer: {
			id: 2,
			grade: 100,
			comment: 'Buen trabajo 2'
		},
		idOption: 2,
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tenetur, iste corporis, vero aut eaque architecto ratione, voluptatum et quis aspernatur dolore officia. Enim earum, ad voluptates blanditiis saepe voluptas.',
		team: null
	},
	{
		id: 1,
		answerSeconds: 12,
		audioUrl:
			'https://storage.googleapis.com/eyeland-0/user_content/learning/submission/audio/1683819000810_audio.m4a',
		gradeAnswer: {
			id: 1,
			grade: 98,
			comment: 'Buen trabajo'
		},
		idOption: null,
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tenetur, iste corporis, vero aut eaque architecto ratione, voluptatum et quis aspernatur dolore officia. Enim earum, ad voluptates blanditiis saepe voluptas.',
		team: null
	},
	{
		id: 1,
		answerSeconds: 12,
		audioUrl:
			'https://storage.googleapis.com/eyeland-0/user_content/learning/submission/audio/1683819000810_audio.m4a',
		gradeAnswer: {
			id: 1,
			grade: 98,
			comment: 'Buen trabajo'
		},
		idOption: 1,
		text: null,
		team: null
	}
];

export default AnswersSubmitted;
