import { SendEmailPage } from './send-email'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Votaciones - Restablecer contraseña',
	description:
		'Acorde al tu usuario encontrado se te enviará un correo con un código de 6 caracteres que deberás ingresar en el siguiente paso para continuar para restablecer tu contraseña'
}

export default function page() {
	return <SendEmailPage />
}
