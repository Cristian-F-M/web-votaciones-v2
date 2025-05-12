import type { SelectProps } from '@/types/input'
import { twMerge } from 'tailwind-merge'

export function Select({ className, error, items, ...restProps }: SelectProps) {
	const userAgent = navigator.userAgent
	const isChromium = userAgent.toLowerCase().includes('chrome')

	const selectClassName =
		'custom-select w-full text-gray-800 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-300 [&>option]:dark:text-gray-800 focus:border-(--color)'

	const optionStyle = (index: number) =>
		({ '--delay': `${index * 0.02}s` }) as React.CSSProperties & {
			[key: string]: any
		}

	if (!items) {
		return (
			<div>
				<div className="input w-full relative flex flex-col justify-center">
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
				</div>
				<p
					id="document-error"
					role="alert"
					aria-live="assertive"
					className={`error-message text-xs text-red-600 mt-px ${error ? 'opacity-100' : 'opacity-0'}`}
				>
					{error}
				</p>
			</div>
		)
	}

	const { id, name, required, selectedItem, label, ...restPropsSelect } =
		restProps

	const isDefaultValueSelected = ['', undefined, 'default-value'].includes(
		selectedItem
	)

	return (
		<div>
			<div
				className="input w-full relative flex flex-col"
				aria-labelledby={`${id}-label`}
			>
				<select
					{...restPropsSelect}
					id={id}
					name={name}
					required={required}
					className={twMerge([selectClassName, className])}
				>
					<button className="relative" type="button" tabIndex={-1}>
						<selectedcontent />
						<span className="picker-icon z-50" />
						<label
							id={`${id}-label`}
							htmlFor={id}
							className={`text-label text-gray-800 dark:text-gray-300 z-10 block absolute size-full after:ml-0.5 after:text-red-500 ${required ? "after:content-['*']" : ''}`}
						>
							{label}
						</label>
					</button>
					<option
						value="default-value"
						disabled
						hidden
						className={'text-label-fallback after:ml-0.5 after:text-red-500'}
						selected={isDefaultValueSelected}
					>
						{!isChromium && (
							<div>
								<span>{label}</span>
							</div>
						)}
					</option>
					{items.map((item, index) => (
						<option
							className="text-black dark:text-gray-300"
							key={item.id}
							value={item.value || item.code}
							style={optionStyle(index)}
							selected={[item.name, item.code].includes(selectedItem)}
						>
							<div>{item.name}</div>
						</option>
					))}
				</select>
			</div>
			<p
				id="document-error"
				role="alert"
				aria-live="assertive"
				className={`error-message text-xs text-red-600 dark:text-[#ff7e81] mt-px ${error ? 'opacity-100' : 'opacity-0'}`}
			>
				{error}
			</p>
		</div>
	)
}
