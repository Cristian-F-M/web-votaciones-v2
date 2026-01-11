export function normalize(str: string) {
	// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function includes(b: string, s: string) {
	const regex = new RegExp(normalize(s), 'i')
	return regex.test(normalize(b))
}
