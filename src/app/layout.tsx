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
	const primaryColor = '#ff8617'
	const darkPrimaryColor = '#ba6213'
	const primaryColorContrast = '#f7b272'
	const darkPrimaryColorContrast = '#47280c'

	return (
		<html lang="es" suppressHydrationWarning className="scheme-light-dark">
			<head>
				<link rel="icon" type="image/svg+xml" href="/logo-sena.svg" />
				<style>{`
          :root {
            --primary-color: ${primaryColor};
            --primary-contrast-color: ${primaryColorContrast};
            --dark-primary-color: ${darkPrimaryColor};
            --dark-primary-contrast-color: ${darkPrimaryColorContrast};
          }
        `}</style>
			</head>
			<body className="bg-page">
				<ClientLayout />
				{children}
			</body>
		</html>
	)
}
