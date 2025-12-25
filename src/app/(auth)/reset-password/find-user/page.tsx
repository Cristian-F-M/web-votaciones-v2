import { FindUserPage } from './find-user'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Votaciones - Restablecer contraseña',
	description:
		'Necesitas de tu tipo de documento y número de documento para buscar tu usuario para restablecer tu contraseña'
}

export default function page() {
	return <FindUserPage />
}
