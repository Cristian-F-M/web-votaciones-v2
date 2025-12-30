import type { Metadata } from 'next'
import { Vote } from './vote'

export const metadata: Metadata = {
	title:
		'Votaciones - Vota a por tu candidato favorito para ser el representante de la jornada',
	description: `Ejerce tu derecho al voto votando por tu candidato elejigo para ser representande la la jornada para el centro en el año ${new Date().getFullYear()}`
}

export default function VotePage() {
	return <Vote />
}
