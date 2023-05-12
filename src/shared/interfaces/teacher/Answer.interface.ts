import {
	QuestionDuringtaskDetail,
	QuestionPostaskDetail,
	QuestionPretaskDetail
} from '@interfaces/teacher/Question.interface';

export interface AnswerDetail {
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
	answers: AnswerDetail[];
}

export interface QuestionSubmissionDetailDuringtask
	extends QuestionDuringtaskDetail {
	answers: AnswerDetail[];
}

export interface QuestionSubmissionDetailPostask extends QuestionPostaskDetail {
	answers: AnswerDetail[];
}
