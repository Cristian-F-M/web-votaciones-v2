import type { Errors } from '@/types/api'

export function getErrorEntries(errors: Record<string, any>) {
	return Object.entries(errors).filter(([_, value]) => value)
}

export function getProcessedErrors(
	errors: Errors
): Record<string, string | null> {
	const errorsEntries = Object.entries(errors)
	const locallyErrors: Record<string, string | null> = {}

	for (const [_, error] of errorsEntries) {
		const { path, msg } = error[0]
		locallyErrors[path] = msg
	}
	return locallyErrors
}
