import {
	QuestionTopic,
	QuestionType,
	QuestionCharacter
} from '@enums/Question.enum';
import { Option } from '@interfaces/teacher/Option.interface';

export interface QuestionDetail {
	id: number;
	questionOrder: number;
	content: string;
	type: QuestionType;
	topic: QuestionTopic | null;
	imgAlt: string | null;
	imgUrl: string | null;
	audioUrl: string | null;
	videoUrl: string | null;
	hint: string | null;
	character: QuestionCharacter | null;
	options: Option[];
}

export interface QuestionPretaskDetail extends QuestionDetail {}

export interface QuestionDuringtaskDetail extends QuestionDetail {
	memoryPro: string[];
	superRadar: string[];
}

export interface QuestionPostaskDetail extends QuestionDetail {}

export interface QuestionsTaskDetail {
	pretask: QuestionPretaskDetail[];
	duringtask: QuestionDuringtaskDetail[];
	postask: QuestionPostaskDetail[];
}
