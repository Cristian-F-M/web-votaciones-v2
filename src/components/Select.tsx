import type { SelectProps } from '@/types/input'
import { twMerge } from 'tailwind-merge'
import { InputError } from './InputError'
import { SELECT_DEFAULT_VALUE } from '@/constants/form'

function SelectWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className="input w-full relative flex flex-col justify-center">
			{children}
		</div>
	)
}

export function Select({ className, error, items, ...restProps }: SelectProps) {
	const userAgent = navigator.userAgent
	const isChromium = userAgent.toLowerCase().includes('chrome')

	const selectClassName =
		'custom-select w-full text-gray-800 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-300 [&>option]:dark:text-gray-800 focus:border-primary dark:focus:border-dark-primary'

	const optionStyle = (index: number) =>
		({ '--delay': `${index * 0.02}s` }) as React.CSSProperties & {
			[key: string]: any
		}

	if (!items) {
		return (
			<div>
				<SelectWrapper>
					<select
						{...restProps}
						className={twMerge([
							selectClassName,
							'pointer-events-none',
							className
						])}
					>
						<button className="relative" type="button">
							<selectedcontent />
							<span className="picker-icon z-50" />
						</button>
					</select>
					<div className="absolute w-9/12 h-3 bg-gray-300 dark:bg-gray-500 animate-pulse z-50 rounded" />
				</SelectWrapper>
				<InputError id="document-error" error={error} />
			</div>
		)
	}

	const { id, name, required, selectedItem = SELECT_DEFAULT_VALUE, label, ...restPropsSelect } =
		restProps

	const isDefaultValueSelected = ['', undefined, SELECT_DEFAULT_VALUE].includes(
		selectedItem
	)

	return (
		<div>
			<SelectWrapper>
				<select
					{...restPropsSelect}
					id={id}
					name={name}
					required={required}
					className={twMerge([selectClassName, className])}
					defaultValue={SELECT_DEFAULT_VALUE}
				>
					<button className="relative" type="button" tabIndex={-1}>
						<selectedcontent />
						<span
							className={`picker-icon z-50 ${restPropsSelect.disabled ? 'opacity-0' : ''}`}
						/>
					</button>
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
							style={optionStyle(index)}
							selected={[item.name, item.value].includes(selectedItem)}
						>
							<div>{item.name}</div>
						</option>
					))}
				</select>
			</SelectWrapper>
			<InputError error={error} id={id} />
		</div>
	)
}
