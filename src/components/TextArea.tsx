import { twMerge } from 'tailwind-merge'
import { InputError } from './InputError'

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
	}

export function TextArea({
	placeholder,
	className,
	name,
	id,
	error,
	use,
	...props
}: TextAreaProps) {
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
				{...props}
			/>
			<InputError id={id} error={error} />
		</div>
	)
}
