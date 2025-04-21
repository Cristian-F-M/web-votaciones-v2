import { Suspense } from 'react'
import { Select } from './Select'
import type { InputSelectWrapperProps } from '@/types/input'

async function SelectWithData({
	dataKey,
	items,
	...props
}: InputSelectWrapperProps) {
	const resolvedItems = await Promise.resolve(items())
	const newItems = dataKey ? resolvedItems[dataKey] : []
	return <Select {...props} items={newItems} />
}

export function SelectServerWrapper(props: InputSelectWrapperProps) {
	return (
		<Suspense fallback={<Select {...props} label="Cargando..." items={[]} />}>
			<SelectWithData {...props} />
		</Suspense>
	)
}
