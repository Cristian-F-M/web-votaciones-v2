import { useModelDetails } from '@/states/useEntityDetails'
import type { OpenDetailsButtonProps } from '@/types/table'
import { useCallback } from 'react'

export function OpenDetailsButton({
	children,
	objectKey,
	entityId,
	items,
	...props
}: OpenDetailsButtonProps) {
	const { keys, entity, setKeys, setEntityId, setEntity } = useModelDetails()

	const handleClick = useCallback(() => {
		if (keys.includes(objectKey)) return

		const currentHash = window.location.hash
		let currentObjectKeys: string[] = []

		if (currentHash) {
			const objectKeys = currentHash.split('#')[1].split(':')
			;[...currentObjectKeys] = objectKeys.slice(1, objectKeys.length)
		}

		const newEntity = items.find((i) => i.id === entityId)
		let newHash = `#${entityId}:${objectKey}`

		if (currentHash) newHash = `${currentHash}:${objectKey}`

		window.location.hash = newHash

		setKeys([...currentObjectKeys, objectKey])
		setEntityId(entityId)

		if (!entity) setEntity(newEntity)
	}, [
		objectKey,
		entityId,
		setKeys,
		setEntityId,
		keys,
		entity,
		items,
		setEntity
	])

	return (
		<button
			type="button"
			onClick={handleClick}
			className="text-primary dark:text-dark-primary hover:underline cursor-pointer"
			{...props}
		>
			{children}
		</button>
	)
}
