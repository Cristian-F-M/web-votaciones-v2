import type { Metadata } from 'next'
import Login from './login'

export const metadata: Metadata = {
	title:
		'Votaciones - Inicia sesión para votar en línea por tu candidato preferido en CGAO',
	description:
		'Vota en línea por tu candidato de la jornada preferido en el Centro de gestión agroempresarial del oriente (CGAO, SENA)'
}

export default function Page() {
	return <Login />
}
