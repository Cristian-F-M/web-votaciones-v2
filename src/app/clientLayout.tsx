'use client'
import { SnackbarProvider } from '@/components/SnackbarProvider'
import ThemeScript from '@/components/ThemeScript'

export default function ClientLayout() {
	return (
		<>
			<ThemeScript />
			<SnackbarProvider />
		</>
	)
}
