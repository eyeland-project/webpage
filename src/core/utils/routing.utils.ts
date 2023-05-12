export function parseNumericParam(param: string | null | undefined) {
	const parsed = parseInt(String(param));
	if (isNaN(parsed)) return null;
	return parsed;
}

export function getMenuSelectedKeyFromPath(pathname: string): string {
	const section = String(pathname.split('/teacher').at(-1)).split('/')[1];
	if (
		section === 'session' ||
		section === 'students' ||
		section === 'submissions'
	) {
		return 'courses';
	}
	return section;
}
