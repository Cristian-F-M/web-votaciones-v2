import { Suspense } from 'react'
import { Select } from './Select'
import type { InputSelectWrapperProps } from '@/types/input'

async function SelectWithData({
	dataKey,
	items,
	onErrorChange,
	...props
}: InputSelectWrapperProps) {
	const resolvedItems = await Promise.resolve(items())

	if (!resolvedItems.ok) {
		if (onErrorChange) onErrorChange('No se pudo obtener los datos')
		return <Select {...props} label={props.label} items={[]} />
	}

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
