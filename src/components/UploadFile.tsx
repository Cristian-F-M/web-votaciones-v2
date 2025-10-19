import Upload from '@/icons/Upload'
import { twMerge } from 'tailwind-merge'

type LabelProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'>
type InputProps = React.InputHTMLAttributes<HTMLInputElement>
type SpanProps = React.HTMLAttributes<HTMLSpanElement>

type UploadFileProps = LabelProps & {
	id: string
	name: string
	text: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	inputProps?: InputProps
	spanProps?: SpanProps
}

export function UploadFile({
	id,
	name,
	onChange,
	text,
	className,
	inputProps,
	spanProps,
	...labelProps
}: UploadFileProps) {
	return (
		<label
			htmlFor={id}
			className={twMerge(
				'cursor-pointer border border-gray-400/60 rounded px-2 py-1.5 flex flex-row gap-2 items-center justify-center dark:border-gray-600/60',
				className
			)}
			{...labelProps}
		>
			<input
				className="hidden"
				type="file"
				name={name}
				id={id}
				onChange={onChange ?? inputProps?.onChange}
				{...inputProps}
			/>
			<span
				className="flex flex-row gap-2 items-center justify-center [&_svg]:size-5"
				{...spanProps}
			>
				<Upload /> {text}
			</span>
		</label>
	)
}
