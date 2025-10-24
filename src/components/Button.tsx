import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Loader } from '@/components/Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
	showLoader: boolean
	primary?: boolean
}

export function Button({
	children,
	className,
	loading,
	showLoader,
	primary = true,
	...props
}: ButtonProps) {
	const buttonText =
		loading && showLoader ? <Loader className="size-6 text-white" /> : children

	return (
		<button
			className={twMerge([
				'button',
				primary ? 'primary-button' : 'secondary-button',
				className,
				loading && '!cursor-progress'
			])}
			{...props}
		>
			{buttonText}
		</button>
	)
}
