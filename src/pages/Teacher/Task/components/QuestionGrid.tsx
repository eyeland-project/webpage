import QuestionTypeSelect from './QuestionTypeSelect';
import QuestionTypeFill from './QuestionTypeFill';
import QuestionTypeOrder from './QuestionTypeOrder';
import QuestionTypeAudioSelect from './QuestionTypeAudioSelect';
import QuestionTypeFlashcard from './QuestionTypeFlashcard';
import QuestionTypeAudioOrderWord from './QuestionTypeAudioOrderWord';
import QuestionTypeAudioSpeaking from './QuestionTypeAudioSpeaking';
import QuestionTypeSelectSpeaking from './QuestionTypeSelectSpeaking';
import QuestionTypeOpen from './QuestionTypeOpen';

import { QuestionType } from '@enums/Question.enum';
import {
	QuestionDuringtaskDetail,
	QuestionPostaskDetail,
	QuestionPretaskDetail
} from '@interfaces/teacher/Question.interface';

function QuestionGrid({
	questions
}: {
	questions:
		| QuestionPretaskDetail[]
		| QuestionDuringtaskDetail[]
		| QuestionPostaskDetail[];
}) {
	const getQuestionElement = (
		question:
			| QuestionPretaskDetail
			| QuestionDuringtaskDetail
			| QuestionPostaskDetail
	): JSX.Element => {
		switch (question.type) {
			case QuestionType.SELECT:
				return <QuestionTypeSelect question={question} />;
			case QuestionType.FILL:
				return <QuestionTypeFill question={question} />;
			case QuestionType.ORDER:
				return <QuestionTypeOrder question={question} />;
			case QuestionType.AUDIO_SELECT:
				return <QuestionTypeAudioSelect question={question} />;
			case QuestionType.FLASHCARD:
				return <QuestionTypeFlashcard question={question} />;
			case QuestionType.AUDIO_ORDERWORD:
				return <QuestionTypeAudioOrderWord question={question} />;
			case QuestionType.AUDIO_SPEAKING:
				return <QuestionTypeAudioSpeaking question={question} />;
			case QuestionType.SELECT_AND_SPEAKING:
				return <QuestionTypeSelectSpeaking question={question} />;
			case QuestionType.OPEN:
				return <QuestionTypeOpen question={question} />;
			default:
				return <></>;
		}
	};

	return (
		<div className="grid auto-rows-fr xl:grid-cols-3 xl:gap-4 lg:grid-cols-2 lg:gap-4 md:grid-cols-1 md:gap-4 sm:grid-cols-1 sm:gap-4">
			{questions.map((question, index) => (
				<div key={index}>{getQuestionElement(question)}</div>
			))}
		</div>
	);
}

export default QuestionGrid;
