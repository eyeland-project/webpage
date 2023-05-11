import {
	QuestionDuringtaskDetail,
	QuestionPostaskDetail,
	QuestionPretaskDetail
} from '@interfaces/teacher/Question.interface';

interface Answer {
	id: number;
	idOption: number | null;
	answerSeconds: number | null;
	audioUrl: string | null;
	text: string | null;
	gradeAnswer: {
		id: number;
		grade: number;
		comment: string | null;
	} | null;
	team: {
		id: number;
		name: string;
	} | null;
}

export interface QuestionSubmissionDetailPretask extends QuestionPretaskDetail {
	answers: Answer[];
}

export interface QuestionSubmissionDetailDuringtask
	extends QuestionDuringtaskDetail {
	answers: Answer[];
}

export interface QuestionSubmissionDetailPostask extends QuestionPostaskDetail {
	answers: Answer[];
}
