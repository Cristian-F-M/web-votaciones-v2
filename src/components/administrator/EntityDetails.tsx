import type { CustomObject } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { snackbar } from '@/utils/dom'
import { getModelsNames } from '@/utils/table'
import { doFetch } from '@/utils/fetch'
import { Loader } from '@/components/Loader'

interface EntityDetailsProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {
	entity: CustomObject | undefined
	entityKey: string
}

interface EntityDetailsItemProps {
	entity: { key: string; value: unknown; name: string }
}

export function EntityDetailsItem({ entity }: EntityDetailsItemProps) {
	const { key, value, name } = entity

	let valueToRender: string | React.ReactNode = JSON.stringify(value)

	if (value == null) valueToRender = 'N/A'

	if (typeof value === 'string') {
		valueToRender = value

		if (Date.parse(value)) {
			const date = new Date(value)

			valueToRender = date.toLocaleDateString('es', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			})
		}
	}

	if (!!value && typeof value === 'object') {
		const title =
			'Lista de los registros que tienen asociada esta entidad; Por el momento esta funcionalidad no está disponible :c'
		valueToRender = (
			<button
				type="button"
				className="cursor-pointer text-gray-600 dark:text-gray-400 hover:underline"
				title={title}
				onClick={() =>
					snackbar({ message: title, options: { autoHideDuration: 1500 } })
				}
			>
				[{key}]
			</button>
		)
	}

	if (key.includes('password')) valueToRender = '********'

	return (
		<>
			<li>
				<h5>{name}</h5>
				<span>{valueToRender}</span>
			</li>
			<hr />
		</>
	)
}

export function EntityDetails({
	entity,
	entityKey,
	...props
}: EntityDetailsProps) {
	const entries = Object.entries(entity ?? {})
	const entityDetailsItemKeys = useMemo(
		() => entries.map(() => crypto.randomUUID()),
		[entries]
	)
	const [headersNames, setHeadersNames] = useState<string[]>([])
	const [modelName] = getModelsNames(entityKey)

	const getHeadersNames = useCallback(async () => {
		if (!modelName || !entity) return

		const response = await doFetch<{ ok: true; data: string[] }>({
			url: `/config/table-headers/${modelName}`
		})

		if (!response.ok) return setHeadersNames(Object.keys(entity))

		setHeadersNames(response.data)
	}, [modelName, entity])

	useEffect(() => {
		getHeadersNames()
	}, [getHeadersNames])

	if (!entity || headersNames.length === 0)
		return (
			<span className="block w-fit mx-auto mt-10">
				<Loader className="text-inherit size-8" />
			</span>
		)

	return (
		<section {...props}>
			<ul>
				{entries.map(([key, value], index) => (
					<EntityDetailsItem
						key={entityDetailsItemKeys[index]}
						entity={{ key, value, name: headersNames[index] }}
					/>
				))}
			</ul>
		</section>
	)
}
