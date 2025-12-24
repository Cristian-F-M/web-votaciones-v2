'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SingleCodeInput } from './SingleCodeInput'

type ControlledProps = {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

type UncontrolledProps = {
	name: string
	id: string
}

type CodeInputProps = {
	size: number
} & (ControlledProps | UncontrolledProps) &
	React.InputHTMLAttributes<HTMLInputElement>

export function CodeInput({ size, className, ...props }: CodeInputProps) {
	const [code, setCode] = useState(''.padEnd(size, ' '))
	const isControled = 'value' in props && 'setValue' in props
	const inputRefs = useRef<HTMLInputElement[]>([])

	const handleChange = useCallback(
		(text: string, index?: number) => {
			let fn = setCode
			if (isControled) fn = props.setValue

			if (index === undefined) {
				fn(text)
				text.split('').forEach((char, i) => {
					const input = inputRefs.current[i]

					if (input) input.value = char
				})

				inputRefs.current.at(-1)?.focus()
				return
			}

			fn((prev) => {
				const chars = prev.split('')
				chars[index] = text

				return chars.join('')
			})
		},
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		[isControled, props]
	)

	const inputName = !isControled ? props.name : 'input-code'

	useEffect(() => {
		inputRefs.current.at(0)?.focus()
	}, [])

	return (
		<div className={twMerge('w-fit', className)}>
			<input
				type="text"
				name={inputName}
				id="input-code--input-result"
				className="hidden uppercase"
				disabled
				value={code}
				onChange={() => {}}
				readOnly
				{...props}
			/>
			<div className="flex gap-2 md:gap-3">
				{Array.from({ length: size }).map((_, index) => (
					<SingleCodeInput
						// biome-ignore lint/suspicious/noArrayIndexKey: It does not matter
						key={`sngle-code-input-${index}`}
						onChange={handleChange}
						index={index}
						size={size}
						inputRef={(el) => {
							if (!el) return
							inputRefs.current[index] = el
						}}
					/>
				))}
			</div>
		</div>
	)
}
