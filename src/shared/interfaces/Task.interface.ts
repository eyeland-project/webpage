export interface TaskSummary {
	id: number;
	name: string;
	description: string;
	taskOrder: number;
	thumbnailUrl: string;
}

export interface TaskDetail {
	id: number;
	name: string;
	description: string;
	longDescription: string;
	keywords: string[];
	taskOrder: number;
	thumbnailUrl: string;
}
