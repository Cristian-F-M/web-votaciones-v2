import type { Metadata } from 'next'
import { NoElection } from './no-election'

export const metadata: Metadata = {
	title: 'Votaciones - No hay votaciones para este año',
	description: `Actualmente no hay votaciones disponibles para el año ${new Date().getFullYear()}, puedes activar las notificaciones por correo o puedes descargar la aplicación móvil para recibir las notificaciones`
}

export default function NoElectionPage() {
	return <NoElection />
}
