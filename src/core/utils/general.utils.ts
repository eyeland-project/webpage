export function parseStudentName(firstName: string, lastName: string): string {
	return `${firstName.split(' ')[0]} ${lastName.split(' ')[0]}`;
}

export function parsePhone({
	countryCode,
	number
}: {
	countryCode: string;
	number: string;
}) {
	return `+${countryCode} ${number}`;
}
