import { QuestionType } from '@enums/Question.enum';
import {
	QuestionDuringtaskDetail,
	QuestionPostaskDetail,
	QuestionPretaskDetail
} from '@interfaces/teacher/Question.interface';
import QuestionTypeSelect from './QuestionTypeSelect';

function QuestionGrid({
	questions
}: {
	questions:
		| QuestionPretaskDetail[]
		| QuestionDuringtaskDetail[]
		| QuestionPostaskDetail[];
}) {
	return (
		<div className="grid xl:grid-cols-3 xl:gap-4 lg:grid-cols-2 lg:gap-4 md:grid-cols-1 md:gap-4 sm:grid-cols-1 sm:gap-4">
			{questions.map((question, index) => (
				<div key={index}>
					{question.type === QuestionType.SELECT ? (
						<QuestionTypeSelect question={question} />
					) : (
						<></>
					)}
				</div>
			))}
		</div>
	);
}

export default QuestionGrid;
