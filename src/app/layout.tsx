import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/app/clientLayout'

export const metadata: Metadata = {
	title: 'Votaciones - Vota en línea por tu candidato preferido en CGAO',
	description:
		'Vota en línea por tu candidato de la jornada preferido en el Centro de gestión agroempresarial del oriente (CGAO, SENA)'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const color = '#ff8617'

	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				<link rel="icon" type="image/svg+xml" href="./logo-sena.svg" />
				<style>{`
          body {
            --color: ${color};
          }
        `}</style>
			</head>
			<body className="dark:bg-gray-900">
				<ClientLayout />
				{children}
			</body>
		</html>
	)
}
