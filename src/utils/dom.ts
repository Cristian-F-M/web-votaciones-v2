import { snackbarOptions } from '@/constants/snackbar'
import { type OptionsObject, enqueueSnackbar } from 'notistack'

export function scrollSmooth(element: HTMLElement | string) {
	let newElement: ReturnType<Document['querySelector']> | HTMLElement | null =
		null
	newElement =
		typeof element === 'string' ? document.querySelector(element) : element

	newElement?.scrollIntoView({
		behavior: 'smooth'
	})
}

export function getStringTime(seconds: number) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

interface SnackbarProps {
	message: string | undefined
	variant?: OptionsObject['variant']
	options?: OptionsObject
}

export function snackbar({
	message,
	variant = 'info',
	options = snackbarOptions
}: SnackbarProps) {
	if (!message) return null
	return enqueueSnackbar(message, { variant, ...options })
}
