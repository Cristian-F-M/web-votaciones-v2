import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Loader } from '@/components/Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
	showLoader: boolean
	primary?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			loading,
			showLoader,
			primary = true,
			...props
		}: ButtonProps,
		ref
	) => {
		const buttonText =
			loading && showLoader ? (
				<Loader className="size-6 text-white" />
			) : (
				children
			)

		return (
			<button
				className={twMerge([
					'button',
					primary ? 'primary-button' : 'secondary-button',
					className,
					loading && '!cursor-progress'
				])}
				{...props}
				ref={ref}
			>
				{buttonText}
			</button>
		)
	}
)
