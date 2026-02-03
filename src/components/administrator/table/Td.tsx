import type { TableSingleItem, TdProps } from '@/types/table'
import { OpenDetailsButton } from '@/components/administrator/table/OpenDetailsButton'
import { isISODate } from '@/utils/global'

export function Td({ children, itemId, items, className, ...props }: TdProps) {
	const isValue = 'value' in props

	// This is a dirty hack to remove the headerName & value props from the props object
	let tdProps: Omit<typeof props, 'headerName' | 'value'> = props
	let headerName: string | undefined = undefined
	let value: TableSingleItem | undefined = undefined

	if (isValue) ({ headerName, value, ...tdProps } = props)
	const lowerHeaderName = headerName?.toLowerCase() ?? ''

	return (
		<td className={className} {...tdProps}>
			{(() => {
				if (!isValue || !headerName) return children
				if (value == null) return 'N/A'
				if (lowerHeaderName === 'id') return `${value.slice(0, 8)}...`
				if (typeof value === 'boolean') return value ? 'Verdadero' : 'Falso'

				if (lowerHeaderName.endsWith('id') || typeof value !== 'string') {
					let text = `[${headerName}]`
					if (Array.isArray(value))
						text = `[${(value as unknown[]).length} ${headerName}]`

					return (
						<OpenDetailsButton
							items={items}
							entityId={itemId}
							objectKey={headerName.replace('Id', '')}
						>
							{text}
						</OpenDetailsButton>
					)
				}

				if (isISODate(value)) {
					return new Date(value).toLocaleDateString('es-ES', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit'
					})
				}

				if (lowerHeaderName.includes('token')) return `${value.slice(0, 8)}...`
				if (lowerHeaderName.includes('password')) return '********'

				return value
			})()}
		</td>
	)
}
