import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface CheckboxControlledProps {
	checked: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface CheckboxBaseProps {
	label: string
	id: string
	name: string
	checkboxClassName?: string
}

type CheckboxProps =
	| (CheckboxControlledProps & CheckboxBaseProps)
	| (CheckboxBaseProps & { checked?: never; onChange?: never })

export function Checkbox({
	label,
	id,
	name,
	checked,
	onChange,
	checkboxClassName,
	...props
}: CheckboxProps) {
	const isControlled = checked !== undefined || onChange !== undefined
	const [internalChecked, setInternalChecked] = useState(false)
	const checkboxRef = useRef<HTMLInputElement>(null)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		checkboxRef.current?.focus()
		if (isControlled) return onChange?.(e)
		toggleCheckbox()
	}

	function toggleCheckbox() {
		setInternalChecked(!internalChecked)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault()
			toggleCheckbox()
		}
	}

	const isChecked = isControlled ? checked : internalChecked

	return (
		<div className="checkbox-wrapper">
			<input
				className="inp-checkbox"
				id={id}
				type="checkbox"
				checked={isChecked}
				onChange={handleChange}
				name={name}
				value={String(isChecked)}
				{...props}
			/>
			<label
				className="label select-none cursor-pointer rounded-md transition-all 
        duration-200 inline-block not-last:mr-1.5 md:w-fill md:inline-block"
				htmlFor={id}
			>
				<span
					// biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
					// biome-ignore lint/a11y/useSemanticElements: <explanation>
					role="checkbox"
					tabIndex={0}
					className={twMerge(
						'align-middle translate-0 translate-3d size-4.5',
						checkboxClassName
					)}
					onKeyDown={handleKeyDown}
					aria-checked={isChecked}
					ref={checkboxRef}
				>
					<svg className="size-full" viewBox="0 0 12 10">
						<title>Check</title>
						<polyline points="1.5 6 4.5 9 10.5 1" />
					</svg>
				</span>
				<span className="text-gray-600 dark:text-gray-300">{label}</span>
			</label>
		</div>
	)
}
