import { useState, useEffect } from 'react';
import 'rc-collapse/assets/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useGradeAnswer from '@hooks/useGradeAnswer';

import AnswerSubmittedList from '@pages/Teacher/components/AnswerSubmittedList';

import {
	GradeAnswerCreate,
	GradeAnswerDetail,
	GradeAnswerUpdate
} from '@interfaces/teacher/GradeAnswer.interface';

import {
	AnswerDetail,
	QuestionSubmissionDetailPostask
} from '@interfaces/teacher/Answer.interface';
import Button from '@components/Button';

function GradePanel({
	questionSubmissions,
	setQuestionSubmissions,
	idCourse,
	idTaskAttempt
}: {
	questionSubmissions: QuestionSubmissionDetailPostask[];
	setQuestionSubmissions: Function;
	idCourse: number;
	idTaskAttempt: number;
}) {
	const { createGradeAnswer, updateGradeAnswer } = useGradeAnswer();

	const [idAnswerSelected, setIdAnswerSelected] = useState<number | null>(
		questionSubmissions[0]?.answers[0]?.id ?? null
	);
	const [answerSelected, setAnswerSelected] = useState<AnswerDetail | null>(
		null
	);
	const [questionSelected, setQuestionSelected] =
		useState<QuestionSubmissionDetailPostask | null>(null);

	const [grade, setGrade] = useState<{
		comment: string | null;
		grade: number | string;
	}>(answerSelected?.gradeAnswer ?? { comment: '', grade: '' });

	const onGrade = async () => {
		if (!answerSelected) {
			return;
		}
		const fields = {
			grade: parseInt(String(grade.grade)),
			comment: grade.comment
		};
		if (isNaN(fields.grade) || fields.grade < 0 || fields.grade > 100)
			return;

		const updateQuestionSubmissions = (
			fields: Partial<GradeAnswerDetail>
		) => {
			setQuestionSubmissions(
				questionSubmissions.map((questionSubmission) => {
					if (questionSubmission.id !== questionSelected?.id) {
						return questionSubmission;
					}
					return {
						...questionSubmission,
						answers: questionSubmission.answers.map((answer) => {
							if (answer.id !== idAnswerSelected) {
								return answer;
							}
							return {
								...answer,
								gradeAnswer: {
									...answer.gradeAnswer,
									...fields
								}
							};
						})
					};
				})
			);
		};

		if (answerSelected.gradeAnswer) {
			const updateFields: GradeAnswerUpdate = fields as GradeAnswerUpdate;
			try {
				await updateGradeAnswer(
					idCourse,
					idTaskAttempt,
					answerSelected.id,
					answerSelected.gradeAnswer.id,
					updateFields
				);
				updateQuestionSubmissions(updateFields);
				toast.success('Calificación actualizada');
			} catch (err) {
				toast.error('Error al actualizar calificación');
			}
		} else {
			const createFields: GradeAnswerCreate = fields as GradeAnswerCreate;
			try {
				const { id } = await createGradeAnswer(
					idCourse,
					idTaskAttempt,
					answerSelected.id,
					createFields
				);
				updateQuestionSubmissions({ ...createFields, id });
				toast.success('Calificación realizada');
			} catch (err) {
				toast.error('Error al realizar calificación');
			}
		}
	};

	useEffect(() => {
		const { answer, questionSubmission } =
			questionSubmissions.reduce(
				(
					acc: {
						questionSubmission: QuestionSubmissionDetailPostask | null;
						answer: AnswerDetail | null;
					},
					questionSubmission
				) => {
					const answer = questionSubmission.answers.find(
						({ id }) => id === idAnswerSelected
					);
					if (!answer) return acc;
					return {
						questionSubmission,
						answer
					};
				},
				{
					questionSubmission: null,
					answer: null
				}
			) ?? null;
		setAnswerSelected(answer);
		setQuestionSelected(questionSubmission);
		setGrade(answer?.gradeAnswer ?? { comment: '', grade: '' });
	}, [idAnswerSelected]);

	return (
		<>
			<ToastContainer />
			<div className="flex mt-4 gap-4 h-full">
				<div className="flex flex-col gap-2 w-3/4 overflow-y-auto">
					{questionSubmissions.map((questionSubmission, i) => (
						<AnswerSubmittedList
							key={i}
							questionSubmission={questionSubmission}
							idAnswerSelected={idAnswerSelected}
							setIdAnswerSelected={setIdAnswerSelected}
						/>
					))}
				</div>
				{idAnswerSelected !== null ? (
					<div className="flex flex-col gap-6 pt-6">
						<div className="text-lg">
							<div className="font-medium">Evaluando:</div>
							<div className="text-sm">
								{`Pregunta ${
									questionSelected?.questionOrder ?? ''
								} - Respuesta ${
									questionSelected?.answers.findIndex(
										({ id }) => id === idAnswerSelected
									)! + 1
								}`}
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<div className="">
								<div className="text-sm font-medium">
									Calificación
								</div>
								<div className="flex items-center gap-1">
									<input
										className="text-sm w-16 h-8 border border-gray-primary rounded-md p-2"
										type="number"
										min={0}
										max={100}
										step={10}
										value={grade.grade}
										onChange={(e) =>
											setGrade({
												...grade,
												grade: e.target.value
											})
										}
									/>
									/100
								</div>
							</div>
							<div>
								<div className="text-sm font-medium">
									Comentarios
								</div>
								<textarea
									placeholder="Opcional"
									className="w-64 h-32 resize-none border border-gray-primary rounded-md p-2 text-sm"
									maxLength={500}
									value={grade.comment ?? ''}
									onChange={(e) =>
										setGrade({
											...grade,
											comment: e.target.value
										})
									}
								/>
							</div>
						</div>
						<Button className="text-sm" onClick={onGrade}>
							Confirmar
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center h-full gap-4">
						<div className="italic opacity-70 text-sm text-center cursor-default">
							Seleccione una pregunta para calificar
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default GradePanel;
