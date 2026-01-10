import { useModelDetails } from '@/states/useModelDetails'
import { doFetch } from '@/utils/fetch'
import { getModelsNames } from '@/utils/table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconChevronRight, IconX } from '@tabler/icons-react'
import { Table } from './Table'
import type { CustomObject } from '@/types'
import type { TableItems } from '@/types/table'
import { EntityDetails } from './EntityDetails'
import '@/styles/detailsPanel.css'

interface DetailsPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DetailsPanel({ className, ...props }: DetailsPanelProps) {
	const {
		keys,
		entity,
		entityId,
		setKeys,
		setEntityId,
		getLastKey,
		setEntity,
		reset
	} = useModelDetails()
	const [open, setOpen] = useState(false)
	const [headersNames, setHeadersNames] = useState<string[]>([])
	const lastKey = getLastKey(keys)
	const [modelName] = getModelsNames(lastKey)

	let item: CustomObject | undefined = entity as CustomObject

	for (const k of keys) {
		if (Array.isArray(item)) item = item[0]

		if (!item || typeof item[k] === 'string') break

		item = item[k]
	}

	const isArray = Array.isArray(item)
	const isObject = !isArray && typeof item === 'object'

	const getHeadersNames = useCallback(async () => {
		if (!entity || !modelName) return

		const response = await doFetch<{ ok: true; data: string[] }>({
			url: `/config/table-headers/${modelName}`
		})

		if (!response.ok) return

		setHeadersNames(response.data)
	}, [entity, modelName])

	const handleClose = useCallback(() => {
		const newEntityId = keys.length <= 1 ? null : entityId
		const newKeys = keys.slice(0, -1)
		const newEntity = !newEntityId && newKeys.length === 0 ? null : entity

		setEntityId(newEntityId)
		setKeys(newKeys)
		setEntity(newEntity)

		if (!newEntityId && newKeys.length <= 0)
			return window.history.replaceState(null, '', window.location.pathname)

		const newHash = `${newEntityId ?? ''}${newKeys.length > 0 ? ':' : ''}${newKeys.join(':')}`
		window.location.hash = newHash
	}, [setEntityId, setKeys, setEntity, keys, entityId, entity])

	const handleHashChange = useCallback(() => {
		const currentHash = window.location.hash
		if (!currentHash) return

		const [entityId, ...objectKeys] = currentHash.replace('#', '').split(':')

		if (entity?.id !== entityId) {
			window.history.pushState(null, '', window.location.pathname)
			reset()
			return
		}

		setEntityId(entityId)
		setKeys(objectKeys)
	}, [setEntityId, setKeys, entity, reset])

	const handleBackdropClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			event.preventDefault()
			const target = event.target as HTMLElement

			if (target.closest('.side-panel')) return

			handleClose()
		},
		[handleClose]
	)

	useEffect(() => {
		getHeadersNames()
	}, [getHeadersNames])

	useEffect(() => {
		const mustBeOpen = !!entity && !!item && keys.length > 0
		setOpen(mustBeOpen)
	}, [entity, item, keys])

	useEffect(() => {
		handleHashChange()
	}, [handleHashChange])

	useEffect(() => {
		window.addEventListener('hashchange', handleHashChange)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, [handleHashChange])

	const title = headersNames.at(-1) ?? modelName

	const keysIds = useMemo(() => keys.map(() => crypto.randomUUID()), [keys])

	let itemsName = window.location.pathname.split('/').at(-1)
	itemsName = itemsName?.endsWith('s') ? itemsName.slice(0, -1) : itemsName

	return (
		<div
			className={twMerge('backdrop--side-panel ', open && 'open')}
			onClick={handleBackdropClick}
			title="Haz clic para cerrar el panel"
		>
			<div
				className={twMerge(
					'side-panel bg-page-contrast custom-scroll',
					className,
					open && 'open',
					isObject && '!max-w-[500px]'
				)}
				title=""
				{...props}
			>
				<div className="route-indicator">
					<span>
						{itemsName}[{entity?.id?.slice(0, 6)}
						...]
					</span>
					{keys.map((k, index) => (
						<div key={keysIds[index]}>
							<IconChevronRight />
							<span>{k}</span>
						</div>
					))}
				</div>
				<header>
					<h2>{title}</h2>
					<button type="button" onClick={handleClose} className="">
						<IconX />
					</button>
				</header>

				<main>
					{isObject && <EntityDetails entity={item} />}

					{isArray && (
						<Table items={item as TableItems} modelName={lastKey ?? ''} />
					)}
				</main>
			</div>
		</div>
	)
}
