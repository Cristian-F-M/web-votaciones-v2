import type { InputSelectProps } from '@/types/input'
import { twMerge } from 'tailwind-merge'

export function Select({
	id,
	name,
	label,
	required,
	error,
	className,
	selectedItem,
	items,
	...restProps
}: InputSelectProps) {
	return (
		<div>
			<div
				className="input w-full relative flex flex-col"
				aria-labelledby={`${id}-label`}
			>
				<select
					{...restProps}
					id={id}
					name={name}
					required={required}
					defaultValue={selectedItem}
					className={twMerge([
						'w-full text-gray-800 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-300 [&>option]:dark:text-gray-800',
						className
					])}
				>
					<option value="0" disabled>
						{label}
					</option>
					{items.map((item) => (
						<option key={item.id} value={item.value}>
							{item.name}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
