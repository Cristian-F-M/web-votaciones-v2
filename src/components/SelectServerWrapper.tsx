import { Suspense } from 'react'
import { Select } from './Select'
import type { InputSelectWrapperProps } from '@/types/input'

export async function SelectServerWrapper<T>({
	items,
	dataKey,
	...props
}: InputSelectWrapperProps) {
	const resolvedItems = await Promise.resolve(items())
	const mewItems = dataKey ? resolvedItems[dataKey] : []

	return (
		<Suspense fallback={<Select {...props} label="Cargando..." items={[]} />}>
			<Select {...props} items={mewItems} />
		</Suspense>
	)
}
