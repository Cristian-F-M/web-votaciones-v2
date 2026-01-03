import type { Metadata } from 'next'
import { WaitingStartElections } from './waiting-start-elections'

export const metadata: Metadata = {
	title:
		'Votaciones - La votación aún no ha comenzado',
	description: "Las votaciones aún no han comenzado, mientras esperas puedes activar las notificaciones para que te informen cuando la votación comience."
}

export default function WaitingStartElectionsPage() {
	return <WaitingStartElections />
}
