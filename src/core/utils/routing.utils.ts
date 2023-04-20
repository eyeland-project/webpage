export function parseNumericParam(param: string | null | undefined) {
	const parsed = parseInt(String(param));
	if (isNaN(parsed)) return null;
	return parsed;
}
