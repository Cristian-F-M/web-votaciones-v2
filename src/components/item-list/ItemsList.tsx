import { useCallback, useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { SingleItemList } from '@/components/item-list/SingleItemList'
import * as z from 'zod'
import { INPUTS_VALIDATIONS as IV } from '@/constants/form'
import { parseZodMessages } from '@/utils/form'
import type { Item } from '@/types/ItemList'
import { twMerge } from 'tailwind-merge'

interface ItemsListStateProps {
	use: 'state'
	items: Item[]
	setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

interface ItemsListFormProps {
	use: 'form'
	itemsName: string
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
	...props
}: ItemsListProps) {
	const [currentText, setCurrentText] = useState('')
	const [errors, setErrors] = useState<Partial<{ item: string }>>({})
	const [items, setItems] = useState<Item[]>(defaultItems)
	const isState = props.use === 'state'
	const setItemsState = isState ? props.setItems : setItems

	const scheme = z.object({
		item: z.string().nonempty(IV.requiredMessage)
	})

	const handleAddItem = useCallback(() => {
		const result = z.safeParse(scheme, { item: currentText })

		if (!result.success) {
			const errors = parseZodMessages(result)
			setErrors(errors)
			return
		}

		setItemsState((prev) => [
			...prev,
			{ id: Date.now().toString(), text: currentText }
		])
		setCurrentText('')
	}, [setItemsState, currentText, scheme])

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

	const itemsName = props.use === 'form' ? props.itemsName : 'items[]'

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
					{...props}
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
				{items.toReversed().map((item) => (
					<li key={item.id}>
						<SingleItemList
							removeItemProps={props.removeItemProps}
							{...itemInputProps}
							item={item}
							handleRemoveItem={handleRemoveItem}
							name={itemsName}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
