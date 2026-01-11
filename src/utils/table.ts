import type { CustomObject } from '@/types'
import type { TableSingleItem } from '@/types/table'
import { includes } from '@/utils/global'

export function getModelsNames(...keys: (string | undefined)[]) {
	return keys.map((k) => {
		if (!k) return

		let newKey = structuredClone(k)

		if (newKey.endsWith('s')) newKey = newKey.slice(0, -1)
		newKey = newKey.replace('Id', '')
		newKey = `${newKey.charAt(0).toUpperCase()}${newKey.slice(1)}`

		return newKey
	})
}

export function deepSearch(
	item: CustomObject<TableSingleItem> | TableSingleItem,
	query: string
): boolean {
	const lowerQuery = query.toLowerCase().trim()
	const lowerItem = typeof item === 'string' ? item.toLowerCase() : item
	const booleanOptions = [
		['false', 'Falso'],
		['true', 'Verdadero']
	]

	if (item == null) return false
	if (typeof item === 'boolean')
		return booleanOptions[item ? 1 : 0].some(o => includes(o, query))
	if (typeof lowerItem === 'string') return includes(lowerItem, lowerQuery)

	const isArray = Array.isArray(item)
	const isObject = !isArray && typeof item === 'object'

	if (isArray) return item.some((i) => deepSearch(i, lowerQuery))

	if (isObject)
		return Object.values(item).some((i) => deepSearch(i, lowerQuery))

	return false
}
