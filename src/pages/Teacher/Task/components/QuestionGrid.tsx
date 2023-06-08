import {
	QuestionDuringtaskDetail,
	QuestionPostaskDetail,
	QuestionPretaskDetail
} from '@interfaces/teacher/Question.interface';

function QuestionGrid({}: {
	questions:
		| QuestionPretaskDetail[]
		| QuestionDuringtaskDetail[]
		| QuestionPostaskDetail[];
}) {
	return <div className="grid"></div>;
}

export default QuestionGrid;
