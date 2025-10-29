import { ResetPasswordPage } from './resetPassword'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Votaciones - Restablecer contraseña',
	description: 'En está página puedes restablecer tu contraseña'
}

export default function page() {
	return <ResetPasswordPage />
}
