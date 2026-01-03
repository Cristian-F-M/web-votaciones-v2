import { twMerge } from 'tailwind-merge'
import { InputError } from './InputError'
import { useCallback, useState } from 'react'

interface TextAreaStateProps {
	use: 'state'
	value: string
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

interface TextAreaFormProps {
	use: 'form'
}

type TextAreaProps = (TextAreaStateProps | TextAreaFormProps) &
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		name: string
		id: string
		error: string | null | undefined
		use: 'state' | 'form'
		limit?: number
    defaultValue?: string
	}

export function TextArea({
	placeholder,
	className,
	name,
	id,
	error,
	use,
	limit,
	onChange,
  defaultValue,
	...props
}: TextAreaProps) {
	const [text, setText] = useState(defaultValue || '') 

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Backspace' && !!limit && text.length >= limit)
				return event.preventDefault()
  }, [limit, text])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(event)
    setText(event.target.value)
  }, [onChange])

	return (
		<div className="w-full relative flex flex-col justify-center">
			<textarea
				className={twMerge(
					'w-full border-b border-gray-400/60 resize-none outline-none focus:border-primary transition-colors content-end field-sizing-content max-h-24 placeholder:text-gray-500',
					className
				)}
				name={name}
				id={id}
				placeholder={placeholder}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				value={text}
				{...props}
			/>
			<div className="flex justify-between items-center mt-px">
				<InputError id={id} error={error} />
				{!!limit && (
					<div className="w-fit ml-auto -bottom-1 right-0 text-xs text-gray-500 dark:text-gray-400">
						{text.length} / {limit}
					</div>
				)}
			</div>
		</div>
	)
}
