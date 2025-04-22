import type { SelectProps } from '@/types/input'
import { twMerge } from 'tailwind-merge'

export function Select({
	mode,
	className,
	label,
	error,
	...restProps
}: SelectProps) {
	const selectClassName =
		'w-full text-gray-800 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-300 [&>option]:dark:text-gray-800'

	if (mode === 'fallback') {
		return (
			<div>
				<div className="input w-full relative flex flex-col">
					<select
						{...restProps}
						className={twMerge([selectClassName, className])}
						defaultValue="0"
					>
						<option value="0" disabled>
							{label}
						</option>
					</select>
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

	const { id, name, required, items, selectedItem, ...restPropsSelect } =
		restProps as Extract<
			SelectProps,
			{
				mode: 'normal'
			}
		>

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
					defaultValue={selectedItem}
					className={twMerge([selectClassName, className])}
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
