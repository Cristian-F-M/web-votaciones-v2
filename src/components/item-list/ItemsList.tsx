import { useCallback, useState } from 'react'
import { Button } from '@/components/form/Button'
import { Input } from '@/components/form/Input'
import { SingleItemList } from '@/components/item-list/SingleItemList'
import * as z from 'zod'
import { INPUTS_VALIDATIONS as IV } from '@/constants/form'
import { parseZodMessages } from '@/utils/form'
import type { Item } from '@/types/ItemList'
import { twMerge } from 'tailwind-merge'
import { OBJECTIVE_SCHEME } from '@/zod-validations'

interface ItemsListStateProps {
	use: 'state'
	items: Item[]
	setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

interface ItemsListFormProps {
	use: 'form'
	textKey: string
}

interface BaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	itemInputProps?: React.InputHTMLAttributes<HTMLInputElement>
	removeItemProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
	error?: string | null | undefined
	defaultItems?: Item[]
}

type ItemsListProps =
	| (BaseProps & ItemsListStateProps)
	| (BaseProps & ItemsListFormProps)

export function ItemsList({
	label,
	className,
	itemInputProps,
	error,
	onChange,
	defaultItems = [],
	name,
	...props
}: ItemsListProps) {
	const [currentText, setCurrentText] = useState('')
	const [errors, setErrors] = useState<Partial<{ item: string }>>({})
	const [items, setItems] = useState<Item[]>(defaultItems)
	const isState = props.use === 'state'
	const setItemsState = isState ? props.setItems : setItems

	const handleAddItem = useCallback(() => {
		const id = crypto.randomUUID()
		const item = { id, text: currentText }
		const result = z.safeParse(OBJECTIVE_SCHEME, item)

		if (!result.success) {
			const errors = parseZodMessages(result)
			setErrors(errors)
			return
		}

		setItemsState((prev) => [...prev, { id, [itemsTextKey]: currentText }])
		setCurrentText('')
	}, [setItemsState, currentText])

	const handleRemoveItem = useCallback(
		(id: string) => {
			setItemsState((prev) => prev.filter((item) => item.id !== id))
		},
		[setItemsState]
	)

	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault()
				event.stopPropagation()
				handleAddItem()
			}
		},
		[handleAddItem]
	)

	const itemsTextKey = props.use === 'form' ? props.textKey : 'text'
	const itemsIdKey = 'id'

	// This is a dirty hack to remove the textKey prop from the props object
	let rest: Omit<typeof props, 'textKey'> = props
	let textKey: string | undefined = undefined

	if (props.use === 'form') ({ textKey, ...rest } = props)

	// TODO: Add paste event and handle it

	return (
		<div>
			<div className="flex items-center gap-6 h-fit">
				<Input
					type="text"
					className={twMerge('w-full h-[webkit-fill-available]', className)}
					name="item"
					id="item"
					error={error ?? errors.item}
					label={label}
					onChange={(event) => {
						if (onChange) onChange(event)
						setCurrentText(event.target.value)
						setErrors({ item: undefined })
					}}
					value={currentText}
					onKeyDown={handleKeyPress}
					{...rest}
				/>
				<Button
					className="w-fit"
					type="button"
					showLoader={true}
					onClick={handleAddItem}
				>
					Agregar
				</Button>
			</div>

			<ul className="my-6 space-y-2">
				{items.toReversed().map((item, index) => (
					<li key={item.id}>
						<SingleItemList
							index={index}
							removeItemProps={props.removeItemProps}
							{...itemInputProps}
							item={item}
							handleRemoveItem={handleRemoveItem}
							textKey={itemsTextKey}
							idKey={itemsIdKey}
							fieldName={name}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
