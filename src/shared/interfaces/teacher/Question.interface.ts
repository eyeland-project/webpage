import { QuestionTopic, QuestionType } from '@enums/Question.enum';
import { Option } from '@interfaces/teacher/Option.interface';

interface QuestionDetail {
	id: number;
	content: string;
	type: QuestionType;
	topic: QuestionTopic | null;
	imgAlt: string | null;
	imgUrl: string | null;
	audioUrl: string | null;
	videoUrl: string | null;
	options: Option[];
}

export type QuestionPretaskDetail = Omit<
	QuestionDetail,
	'audioUrl' | 'videoUrl'
>;

export interface QuestionDuringtaskDetail extends QuestionDetail {
	nounTranslation: string[];
	prepositionTranslation: string[];
}

export interface QuestionPostaskDetail extends QuestionDetail {}
