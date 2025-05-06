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
	buttonShowPassword = false,
	...restProps
}: InputTextProps) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div>
			<div
				className="input w-full relative flex flex-col"
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
						'w-full text-gray-600 text-sm border-b border-gray-400 border-solid outline-none dark:text-gray-400',
						className
					])}
				/>
				<label
					id={`${id}-label`}
					htmlFor={id}
					className={`text-gray-500 dark:text-gray-400 text-sm pointer-events-none absolute bottom-px flex flex-row items-center gap-px after:ml-0.5 after:text-red-500 ${required ? "after:content-['*']" : ''}`}
				>
					{label}
				</label>
				{type === 'password' && buttonShowPassword && (
					<button
						className="size-fit p-1 rounded right-0 absolute -top-1/2 cursor-pointer hover:bg-gray-200
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
