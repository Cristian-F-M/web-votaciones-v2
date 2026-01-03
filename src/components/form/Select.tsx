import type { SelectProps } from '@/types/input'
import { twMerge } from 'tailwind-merge'
import { InputError } from './InputError'
import { SELECT_DEFAULT_VALUE } from '@/constants/form'

function SelectedItem() {
	return (
		<button className="relative" type="button" tabIndex={-1}>
			<selectedcontent />
			<span className="picker-icon z-50" />
		</button>
	)
}

export function Select({ className, error, items, ...restProps }: SelectProps) {
	const selectClassName =
		'custom-select w-full text-gray-800 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-300 [&>option]:dark:text-gray-800 focus:border-primary dark:focus:border-dark-primary'

	if (!items || items.length === 0) {
		return (
			<div className="input w-full relative flex flex-col justify-center">
				<select
					{...restProps}
					className={twMerge([
						selectClassName,
						'pointer-events-none',
						className
					])}
				>
					<SelectedItem />
				</select>
				<div className="absolute top-1.5 w-9/12 h-3 bg-gray-300 dark:bg-gray-500 animate-pulse z-50 rounded" />
				<InputError id="document-error" error={error} />
			</div>
		)
	}

	const {
		id,
		name,
		required,
		selectedItem = SELECT_DEFAULT_VALUE,
		label,
		...restPropsSelect
	} = restProps

	const isDefaultValueSelected = selectedItem === SELECT_DEFAULT_VALUE

	return (
		<div className="input w-full relative flex flex-col justify-center">
			<select
				{...restPropsSelect}
				id={id}
				name={name}
				required={required}
				className={twMerge([selectClassName, className])}
				defaultValue={SELECT_DEFAULT_VALUE}
			>
				<SelectedItem />
				<option
					value={SELECT_DEFAULT_VALUE}
					disabled
					hidden
					className={'text-label-fallback after:ml-0.5 after:text-red-500'}
					selected={isDefaultValueSelected}
				>
					<div>
						<span
							className={`text-label ${required && 'text-label--required'}`}
						>
							{label}
						</span>
					</div>
				</option>
				{items.map((item, index) => (
					<option
						className="text-black dark:text-gray-300"
						key={item.id}
						value={item.value}
						selected={[item.name, item.value].includes(selectedItem)}
					>
						<div>{item.name}</div>
					</option>
				))}
			</select>
			<InputError error={error} id={id} />
		</div>
	)
}
