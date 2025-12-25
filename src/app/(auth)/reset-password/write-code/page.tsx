import { WriteCodePage } from './write-code'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Votaciones - Restablecer contraseña',
	description:
		'Debes ingresar el código de 6 caracteres que se envió a el correo electrónico asociado a tu usuario, seguido de ello puedes restablecer tu contraseña'
}

export default function page() {
	return <WriteCodePage />
}
