import { useEffect, useState } from 'react'

export function normalize(str: string) {
	// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function includes(b: string, s: string) {
	const regex = new RegExp(normalize(s), 'i')
	return regex.test(normalize(b))
}

export function useDobounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}
