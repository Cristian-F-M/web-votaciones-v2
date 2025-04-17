import { twMerge } from 'tailwind-merge'
import type { InputProps } from '@/types/input'

export function Input({
	id,
	name,
	label,
	required,
	error,
	typeInput,
	className,
	...restProps
}: InputProps) {
	return (
		<div>
			<div
				className="input w-full relative flex flex-col"
				aria-labelledby={`${id}-label`}
			>
				{(() => {
					const { selectedItem, items, ...restPropsSelect } =
						restProps as Extract<InputProps, { typeInput: 'select' }>
					if (typeInput === 'select') {
						return (
							<select
								{...restPropsSelect}
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
						)
					}
				})()}

				{(() => {
					if (typeInput === 'text') {
						const { type, ...restPropsInput } = restProps as Extract<
							InputProps,
							{ typeInput: 'text' }
						>
						return (
							<>
								<input
									{...restPropsInput}
									id={id}
									name={name}
									type={type}
									required={required}
									placeholder=" "
									className={twMerge([
										'w-full text-gray-600 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-400',
										className
									])}
								/>
								<label
									id={`${id}-label`}
									htmlFor={id}
									className="text-gray-500 dark:text-gray-400 text-sm pointer-events-none absolute bottom-px flex flex-row items-center gap-px"
								>
									{label}
									{required && (
										<span className="text-red-600 text-lg leading-3">*</span>
									)}
								</label>
							</>
						)
					}
				})()}
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
