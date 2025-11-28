import { useState } from 'react'
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
}

type ItemsListProps =
	| (BaseProps & ItemsListStateProps)
	| (BaseProps & ItemsListFormProps)

export function ItemsList({
	label,
	className,
	itemInputProps,
	...props
}: ItemsListProps) {
	const [currentText, setCurrentText] = useState('')
	const [errors, setErrors] = useState<Partial<{ item: string }>>({})
	const [items, setItems] = useState<Item[]>([])
	const isState = props.use === 'state'

	const scheme = z.object({
		item: z.string().nonempty(IV.requiredMessage)
	})

	const handleAddItem = () => {
		const result = z.safeParse(scheme, { item: currentText })

		if (!result.success) {
			const errors = parseZodMessages(result)
			setErrors(errors)
			return
		}

		if (isState) {
			props.setItems((prev) => [
				...prev,
				{ id: Date.now().toString(), text: currentText }
			])
		}

		setItems((prev) => [
			...prev,
			{ id: Date.now().toString(), text: currentText }
		])
		setCurrentText('')
	}

	const handleRemoveItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id))
	}

	return (
		<div>
			<div className="flex items-center gap-6 h-fit">
				<Input
					type="text"
					className={twMerge('w-full h-[webkit-fill-available]', className)}
					name="item"
					id="item"
					error={errors.item}
					label={label}
					onChange={(event) => {
						setCurrentText(event.target.value)
						setErrors({ item: undefined })
					}}
					value={currentText}
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
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
