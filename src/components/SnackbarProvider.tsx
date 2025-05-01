'use client'
import { SnackbarProvider as Snackbar } from 'notistack'

export function SnackbarProvider() {
	return (
		<Snackbar
			anchorOrigin={{
				horizontal: 'right',
				vertical: 'top'
			}}
			disableWindowBlurListener
		/>
	)
}
