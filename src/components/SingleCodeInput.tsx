import { useCallback } from 'react'

type SingleCodeInputProps = {
	onChange: (newChar: string, index?: number) => void
	index: number
	size: number
	inputRef: (el: HTMLInputElement | null) => void
}

export function SingleCodeInput({
	onChange,
	index,
	size,
	inputRef
}: SingleCodeInputProps) {
	const regex = /^[a-zA-Z0-9]$/
	const pasteRegex = new RegExp(`^[a-zA-Z0-9]{${size}}$`)

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			const { key, ctrlKey } = event
			const $input = event.currentTarget
			const value = $input.value.trim()
			const isBackspace = key === 'Backspace'
			const isDelete = key === 'Delete'

			if (ctrlKey && key === 'v') return

			if (isBackspace || isDelete) {
				if (isBackspace && value.length === 0) {
					const $prevInput = $input.previousElementSibling as HTMLInputElement
					if ($prevInput) $prevInput.focus()
				}

				onChange(' ', index)
				return
			}

			if (regex.test(key)) {
				if (value.length >= 1) {
					const $nextInput = $input.nextElementSibling as HTMLInputElement
					if ($nextInput) $nextInput.focus()
					return
				}

				onChange(key, index)
				setTimeout(() => {
					const $nextInput = $input.nextElementSibling as HTMLInputElement
					if ($nextInput) $nextInput.focus()
				}, 0)
			}
		},
		[index, onChange]
	)

	const handlePaste = useCallback(
		(event: React.ClipboardEvent<HTMLInputElement>) => {
			event.preventDefault()

			const { clipboardData } = event
			const text = clipboardData.getData('text/plain')

			if (!pasteRegex.test(text)) return

			onChange(text)
		},
		[pasteRegex, onChange]
	)

	return (
		<input
			className="aspect-[1/1.3] w-12 bg-gray-300 dark:bg-gray-900 border border-gray-400/60 dark:border-gray-700/80 rounded flex items-center justify-center text-black dark:text-white text-lg text-center uppercase focus:outline-1.5 outline-primary dark:outline-primary caret-black dark:caret-white"
			type="text"
			maxLength={1}
			onKeyDown={handleKeyDown}
			ref={inputRef}
			onPaste={handlePaste}
		/>
	)
}
