import { twMerge } from 'tailwind-merge'
import type { InputTextProps } from '@/types/input'
import { useState } from 'react'
import { EyeAnimatedIcon } from '@/icons/EyeAnimatedIcon'

export function Input({
	id,
	name,
	label,
	required,
	error,
	className,
	type,
	showTogglePassword = false,
	...restProps
}: InputTextProps) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="w-full">
			<div
				className="input w-full relative flex flex-col justify-center"
				aria-labelledby={`${id}-label`}
			>
				<input
					{...restProps}
					id={id}
					name={name}
					type={showPassword ? 'text' : type}
					required={required}
					placeholder=" "
					className={twMerge([
						'w-full text-gray-8 00 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-200 focus:border-primary',
						className
					])}
				/>
				<label
					id={`${id}-label`}
					htmlFor={id}
					className={`text-gray-800 dark:text-gray-300 text-sm pointer-events-none absolute bottom-px flex flex-row items-center gap-px after:ml-0.5 after:text-red-500 ${required ? "after:content-['*']" : ''}`}
				>
					{label}
				</label>
				{type === 'password' && showTogglePassword && (
					<button
						className="size-fit p-0.5 rounded right-0 absolute  cursor-pointer hover:bg-gray-200
             active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-800 transition-colors duration-200"
						type="button"
						title="Mostrar contraseña"
						onClick={() => setShowPassword((prev) => !prev)}
					>
						<EyeAnimatedIcon
							isShowingPassword={showPassword}
							width={18}
							height={18}
						/>
					</button>
				)}
			</div>
			<p
				id="document-error"
				role="alert"
				aria-live="assertive"
				className={`error-message text-xs text-red-600 dark:text-[#ff7e81] mt-px ${error ? 'opacity-100' : 'opacity-0'}`}
			>
				{error}
			</p>
		</div>
	)
}
