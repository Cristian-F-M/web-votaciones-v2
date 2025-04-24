export function getErrorEntries(errors: Record<string, any>) {
	return Object.entries(errors).filter(([_, value]) => value)
}