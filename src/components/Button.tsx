import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Loader } from '@/components/Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
	showLoader: boolean
}

export function Button({
	children,
	className,
	loading,
	showLoader,
	...props
}: ButtonProps) {
	const buttonText =
		loading && showLoader ? <Loader className="size-6 text-white" /> : children

	return (
		<button
			className={twMerge([
				'bg-(--color) w-full px-3 md:py-1.5 py-1 rounded cursor-pointer hover:bg-(--color)/80  mb-3 disabled:cursor-not-allowed disabled:bg-(--color)/70 disabled:text-white/90 flex flex-row gap-2 items-center justify-center not-disabled:active:scale-95 transition-all',
				className,
				loading && '!cursor-progress'
			])}
			{...props}
		>
			{buttonText}
		</button>
	)
}
