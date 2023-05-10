export interface GradeAnswerCreate {
	grade: number;
	comment?: string | null;
}

export type GradeAnswerUpdate = Partial<Omit<GradeAnswerCreate, 'idAnswer'>>;
