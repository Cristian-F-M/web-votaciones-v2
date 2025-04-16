import { twMerge } from 'tailwind-merge'
import type { InputProps } from '@/types/input'

export function Input(props: InputProps) {
	if (props.typeInput === 'select') {
		const {
			id,
			name,
			label,
			required,
			error,
			items,
			typeInput,
			selectedItem = '0',
			className,
			...rest
		} = props

		return (
			<div className="input w-full">
				<fieldset
					className="relative flex flex-col"
					aria-labelledby={`${id}-label`}
				>
					<select
						{...rest}
						id={id}
						name={name}
						required={required}
						defaultValue={selectedItem}
						className={twMerge([
							'w-full text-gray-800 text-sm border-b border-gray-400 border-solid outline-none',
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
				</fieldset>
			</div>
		)
	}

	// Input tipo "text"
	const {
		id,
		name,
		label,
		error,
		required,
		className,
		typeInput,
		type = 'text',
		...rest
	} = props

	return (
		<div className="input w-full">
			<fieldset
				className="relative flex flex-col"
				aria-labelledby={`${id}-label`}
			>
				<input
					{...rest}
					id={id}
					name={name}
					type={type}
					required={required}
					placeholder=" "
					className={twMerge([
						'w-full text-gray-800 text-sm border-b border-gray-400 border-solid outline-none',
						className
					])}
				/>
				<label
					id={`${id}-label`}
					htmlFor={id}
					className="text-gray-500 text-sm pointer-events-none absolute bottom-px flex flex-row items-center gap-px"
				>
					{label}
					{required && (
						<span className="text-red-600 text-lg leading-3">*</span>
					)}
				</label>
			</fieldset>

			{error && (
				<p
					id="document-error"
					role="alert"
					aria-live="assertive"
					className="error-message text-xs text-red-600 mt-px"
				>
					Este campo es obligatorio
				</p>
			)}
		</div>
	)
}
