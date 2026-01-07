import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Loader } from '@/components/Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
	showLoader?: boolean
	secondary?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			loading,
			showLoader = false,
			secondary = false,
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
					secondary ? 'secondary-button' : 'primary-button',
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
