import type { Metadata } from 'next'
import Register from './register'

export const metadata: Metadata = {
	title:
		'Votaciones - Registrate para votar en línea por tu candidato preferido en CGAO'
}

export default function RegisterPage() {
	return <Register />
}
