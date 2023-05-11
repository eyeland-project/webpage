import { useState, useMemo } from 'react';
import Button from '@components/Button';
import { QuestionSubmissionDetailPostask } from '@interfaces/teacher/Answer.interface';
import { QuestionPostaskDetail } from '@interfaces/teacher/Question.interface';

function GradeGrid({
	questionSubmissions
}: {
	questionSubmissions: QuestionSubmissionDetailPostask[];
}) {
	const [idQuestionSelected, setIdQuestionSelected] = useState(-1);
	const [idAnswerSelected, setIdAnswerSelected] = useState(-1);

	const gradeAnswer = useMemo((): {
		grade: number;
		comment: string | null;
	} | null => {
		if (idQuestionSelected === -1 || idAnswerSelected === -1) {
			return null;
		}
		return (
			questionSubmissions
				.find(({ id }) => id === idQuestionSelected)
				?.answers.find(({ id }) => id === idAnswerSelected)
				?.gradeAnswer ?? null
		);
	}, [idAnswerSelected, idQuestionSelected]);

	return (
		<div className="flex mt-4">
			<div className="flex flex-col px-6">
				{questionSubmissions.map((questionSubmission, i) => (
					<QuestionCard
						key={i}
						questionSubmission={questionSubmission}
					/>
				))}
			</div>
			<div className="flex flex-col justify-between">
				<div className="flex flex-col gap-4">
					<div className="pt-4">
						<div className="text-sm font-medium">Calificación</div>
						<div className="flex items-center gap-1">
							<input
								className="text-sm w-12 h-8 border border-gray-primary rounded-md p-2"
								type="number"
								min={0}
								max={100}
								step={1}
								defaultValue={gradeAnswer?.grade ?? ''}
							/>
							/100
						</div>
					</div>
					<div>
						<div className="text-sm font-medium">Comentarios</div>
						<textarea
							id="input"
							placeholder="Ingrese el texto"
							className="w-64 h-32 resize-none border border-gray-primary rounded-md p-2"
							defaultValue={gradeAnswer?.comment ?? ''}
						></textarea>
					</div>
				</div>
				<Button className="text-sm">Confirmar</Button>
			</div>
		</div>
	);
}

function QuestionCard({
	questionSubmission: { content, questionOrder, options, answers }
}: {
	questionSubmission: QuestionSubmissionDetailPostask;
}) {
	return (
		<div className="shadow-md rounded-md flex flex-col gap-2 justify-between px-4 py-2 text-sm">
			<div className="">
				<div className="font-medium">{`Pregunta ${questionOrder}`}</div>
				{content}
			</div>
			<div className="flex flex-col gap-1">
				<div className="font-medium">{'Respuesta(s)'}</div>
				{answers.map(
					(
						{
							audioUrl,
							answerSeconds,
							gradeAnswer,
							idOption,
							text
						},
						i
					) => (
						<div key={i} className="flex flex-col gap-1"></div>
					)
				)}
			</div>
		</div>
	);
}

export default GradeGrid;
