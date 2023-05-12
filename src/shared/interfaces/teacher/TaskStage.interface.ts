export interface TaskStageDetail {
	id: number;
	taskStageOrder: number;
	keywords: string[];
	description: string;
	numQuestions: number;
}

export interface TaskStagesDetail {
	pretask: TaskStageDetail;
	duringtask: TaskStageDetail;
	postask: TaskStageDetail;
}
