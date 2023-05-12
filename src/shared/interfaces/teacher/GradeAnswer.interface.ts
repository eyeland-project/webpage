export interface GradeAnswerDetail {
	id: number;
	grade: number;
	comment: string | null;
}

export interface GradeAnswerCreate {
	grade: number;
	comment?: string | null;
}

export type GradeAnswerUpdate = Partial<Omit<GradeAnswerCreate, 'idAnswer'>>;
