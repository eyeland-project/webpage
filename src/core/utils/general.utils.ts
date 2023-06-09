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

// By Lizcano
export function pseudoRandom(seed: number): number {
	let x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

// By Lizcano
export function shuffle<T>(array: T[], seed?: number): T[] {
	if (seed === undefined) return [...array].sort(() => Math.random() - 0.5);
	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(pseudoRandom(seed++) * (i + 1));
		seed = (seed * 100 + (pseudoRandom(seed++) - 0.5) * 100) / 100;
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}
