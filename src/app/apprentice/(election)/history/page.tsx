import type { Metadata } from 'next'
import { History } from './history'

export const metadata: Metadata = {
	title: 'Historial de votaciones',
	description:
		'En está página puedes encontrar el historial de todas las votaciones realizadas por la plataforma, podras ver información simple del resultado de cada votación'
}

export default function HistoryPage() {
	return <History />
}
