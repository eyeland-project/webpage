export function parseStudentName(firstName: string, lastName: string): string {
	return `${firstName.split(' ')[0]} ${lastName.split(' ')[0]}`;
}

export function parsePhone(
	phone: {
		countryCode: string | null;
		number: string;
	} | null
) {
	if (!phone) return '';
	const { countryCode, number } = phone;
	if (countryCode === null) return number;
	return `+${countryCode} ${number}`;
}
