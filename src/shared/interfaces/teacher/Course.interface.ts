export interface CourseSummary {
	id: number;
	name: string;
}

export interface CourseDetail extends CourseSummary {
	session: boolean;
}

export interface CourseCreate {
	name: string;
}

export type CourseUpdate = Partial<CourseCreate>;
