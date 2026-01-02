import type { Metadata } from 'next'
import { Results } from './results'

export const metadata: Metadata = {
	title: 'Votaciones - Resultados de la votación',
	description: `En está página encontrarás los resultados de la votación en el año ${new Date().getFullYear()}, puedes ver el candidato ganador, los votos totales, la participación y todos los candidatos.`
}

export default function ResultsPage() {
	return <Results />
}
