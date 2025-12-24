import ApprenticeProfilePage from './profile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title:
		'Votaciones - Perfil de aprendiz',
	description:
		'En está página puedes ver y editar tu perfil de aprendiz'
}

export default function page() {
	return <ApprenticeProfilePage />
}
