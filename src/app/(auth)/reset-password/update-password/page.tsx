import { UpdatePasswordPage } from './update-password'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Votaciones - Restablecer contraseña',
	description:
		'Debes ingresar tu nueva contraseña y la confirmación de la misma para restablecer tu contraseña'
}

export default function page() {
	return <UpdatePasswordPage />
}
