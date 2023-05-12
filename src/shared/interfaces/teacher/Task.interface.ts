export interface TaskSummary {
	id: number;
	name: string;
	taskOrder: number;
}

export interface TaskDetail extends TaskSummary {
	description: string;
	thumbnailUrl: string;
	longDescription: string;
	keywords: string[];
}
