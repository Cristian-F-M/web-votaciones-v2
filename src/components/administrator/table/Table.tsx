import { Loader } from '@/components/Loader'
import { Td } from '@/components/administrator/table/Td'
import { Tr } from '@/components/administrator/table/Tr'
import { Button } from '@/components/form/Button'
import { useModelDetails } from '@/states/useEntityDetails'
import type { TableItems, TableProps } from '@/types/table'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import {
	deepSearch,
	getModelsNames,
	getValueType,
	sortData
} from '@/utils/table'
import { IconChevronDown, IconChevronUp, IconPencil } from '@tabler/icons-react'
import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import '@/styles/table.css'
import { Input } from '@/components/form/Input'
import { useDobounce } from '@/utils/global'
import { useSearchParams } from 'next/navigation'
import { Th } from './Th'

export function Table({
	items,
	modelName,
	allowEdit = false,
	modifyUrlOnSearch = false,
	allowSearch = true
}: TableProps) {
	const { setEntity, entity, reset, setKeys, setEntityId } = useModelDetails()
	const [tableHeaders, setTableHeaders] = useState<string[] | null>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [originalTableHeaders, setOriginalTableHeaders] = useState<string[]>([])
	const tableId = useId()
	const params = useSearchParams()
	const debouncedSearchQuery = useDobounce(searchQuery, 400)
	const [orderData, setOrderData] = useState<{
		key: string
		order: 'ASC' | 'DESC'
	} | null>(null)

	const filteredItems = useMemo(() => {
		if (!allowSearch) return items

		return items.filter((i) => deepSearch(i, debouncedSearchQuery))
	}, [items, debouncedSearchQuery, allowSearch])

	const sortedItems = useMemo(() => {
		if (!orderData) return filteredItems

		return sortData(filteredItems, orderData.key, orderData.order)
	}, [filteredItems, orderData])

	const tableIds = useMemo(() => {
		if (!items) return []

		const ids = items.map((i) => {
			const entries = Object.entries(i)

			return [
				entries.map(() => crypto.randomUUID()),
				crypto.randomUUID()
			].flat()
		})

		return ids
	}, [items])

	const tableHeadersIds = useMemo(() => {
		return (tableHeaders ?? []).map(() => crypto.randomUUID())
	}, [tableHeaders])

	const getTableHeaders = useCallback(async () => {
		const [model] = getModelsNames(modelName)

		const response = await doFetch<{ ok: true; data: string[] }>({
			url: `/config/table-headers/${model}`
		})

		if (!response.ok) {
			snackbar({ message: response.message, variant: 'error' })
			return
		}

		setTableHeaders(response.data)
	}, [modelName])

	const handleInputSearch = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(event.currentTarget.value)
		},
		[]
	)

	const handleOrderBy = useCallback((key: string) => {
		return (event: React.MouseEvent<HTMLTableCellElement>) => {
			const target = event.currentTarget
			const thead = target.closest('thead')

			const allThs = thead?.querySelectorAll('th') ?? []

			for (const th of allThs)
				if (target !== th) th.removeAttribute('data-order')

			const { order = 'DESC' } = target.dataset
			const values = ['ASC', 'DESC']

			const orderIndex = values.indexOf(order)
			const newOrder = values[(orderIndex + 1) % values.length] as
				| 'ASC'
				| 'DESC'

			setOrderData({ key, order: newOrder })
			event.currentTarget.dataset.order = newOrder
		}
	}, [])

	useEffect(() => {
		if (!items || items.length === 0) return

		const firstItem = items[0]
		const headers = Object.keys(firstItem)

		setOriginalTableHeaders(headers)
	}, [items])

	useEffect(() => {
		if (!modifyUrlOnSearch) return

		const currentQuery = params.get('q') ?? ''
		setSearchQuery(currentQuery)
	}, [params, modifyUrlOnSearch])

	useEffect(() => {
		if (modifyUrlOnSearch) {
			const queryText = debouncedSearchQuery ? `?q=${debouncedSearchQuery}` : ''
			const newUrl = `${window.location.pathname}${queryText}${window.location.hash}`
			window.history.replaceState(null, '', newUrl)
		}
	}, [debouncedSearchQuery, modifyUrlOnSearch])

	useEffect(() => {
		if (!modelName) return

		getTableHeaders()
	}, [getTableHeaders, modelName])

	useEffect(() => {
		const currentHash = window.location.hash
		if (!currentHash) return
		if (entity || !items || items.length === 0) return

		const [entityId, ...objectKeys] = currentHash.replace('#', '').split(':')
		const newEntity = items.find((i) => i.id === entityId)
		const newUrl = `${window.location.pathname}${window.location.search}`

		if (!newEntity) {
			window.history.replaceState(null, '', newUrl)
			reset()
			return
		}

		setEntity(newEntity)
		setKeys(objectKeys)
		setEntityId(entityId)
	}, [setEntity, items, entity, reset, setEntityId, setKeys])

	return (
		<>
			<div className="mt-10">
				{(!items || !tableHeaders) && (
					<span className="block w-fit mx-auto mt-10">
						<Loader className="text-inherit size-8" />
					</span>
				)}

				{items && tableHeaders && tableHeaders.length > 0 && (
					<>
						{allowSearch && (
							<div className="container--search-input">
								<Input
									className="w-52"
									label="Buscar..."
									name="table-search"
									id={`input-search--${tableId}`}
									onChange={handleInputSearch}
									value={searchQuery}
									autoComplete="off"
								/>
							</div>
						)}
						<div className="table-container custom-scroll">
							<table id={`${modelName}-${tableId}`}>
								<thead>
									<Tr>
										{tableHeaders?.slice(0, -1)?.map((h, index) => (
											<Th
												key={tableHeadersIds[index]}
												data-key={originalTableHeaders[index]}
												onClick={handleOrderBy(originalTableHeaders[index])}
												title={`Ordenar por ${h}`}
											>
												<span className="flex flex-row gap-2 items-center justify-center select-none">
													{h}{' '}
													<span className="flex flex-col [&_svg]:size-3 text-gray-500">
														<IconChevronUp />
														<IconChevronDown />
													</span>
												</span>
											</Th>
										))}
										{allowEdit && <Th>&nbsp;</Th>}
									</Tr>
								</thead>
								<tbody>
									{sortedItems.length === 0 && (
										<Tr>
											<Td
												items={items}
												itemId="no-data"
												className="text-gray-300"
												colSpan={tableHeaders?.length ?? 10}
											>
												{debouncedSearchQuery
													? 'No se encontró nada relacionado con la busqueda'
													: 'No hay datos para mostrar en esta tabla'}
											</Td>
										</Tr>
									)}

									{sortedItems.map((item, rowIndex) => {
										const rowEntries = Object.entries(item)

										return (
											<Tr
												id={(item.id as string) ?? tableIds[rowIndex].at(-1)}
												key={`row-${tableIds[rowIndex].at(-1)}`}
											>
												{rowEntries.map(([headerName, v], index) => (
													<Td
														key={tableIds[rowIndex][index]}
														id={tableIds[rowIndex][index]}
														itemId={item.id as string}
														headerName={headerName}
														value={v}
														items={items}
													/>
												))}

												{allowEdit && (
													<td>
														<Button showLoader type="button">
															<IconPencil />
														</Button>
													</td>
												)}
											</Tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
		</>
	)
}
