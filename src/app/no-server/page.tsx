'use client'
import { Button } from '@/components/Button'
import { ToggleTheme } from '@/components/ToggleTheme'
import Alert from '@/icons/Alert'
import LogoSena from '@/icons/LogoSena'
import Refresh from '@/icons/Refresh'
import Wifi from '@/icons/Wifi'
import WifiOff from '@/icons/WifiOff'
import '@/styles/no-server.css'
import { doFetch } from '@/utils/fetch'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { snackbar } from '@/utils/dom'
import type { GetServerResponse } from '@/types/api'

export default function NoServerPage() {
	const [refreshing, setRefreshing] = useState(false)
	const [isOnline, setIsOnline] = useState(false)
	const searchParams = useSearchParams()
	const router = useRouter()
	const intented = searchParams.get('intented') ?? '/'

	const handleRefresh = useCallback(async () => {
		setRefreshing(true)

		await new Promise((r) => setTimeout(r, 500))

		const response = await doFetch<GetServerResponse>({
			url: '/config/server'
		})

		setRefreshing(false)

		if (!response.ok) {
			setIsOnline(false)
			snackbar({ message: 'Sin conexión :c', variant: 'error' })
			return
		}

		setIsOnline(true)
		snackbar({ message: 'Con conexión', variant: 'success' })

		setTimeout(() => {
			router.replace(intented)
		}, 1000)
	}, [intented, router])

	useEffect(() => {
		handleRefresh()
	}, [handleRefresh])

	return (
		<>
			<div className="absolute top-2 right-2">
				<ToggleTheme />
			</div>

			<section className="w-11/12 mx-auto md:max-w-[650px] my-10">
				<header className="flex items-center justify-between">
					<div className="flex flex-row items-center gap-1.5">
						<LogoSena className="text-primary dark:text-dark-primary size-6" />
						<span className="text-gray-800 dark:text-gray-400 hidden md:block">
							Votaciones - CGAO
						</span>
					</div>
					<div
						className={`px-3 py-1 rounded-full border [&_svg]:size-5 ${isOnline ? 'bg-green-300/80 text-green-600 border-green-400/90 dark:bg-green-950 dark:text-green-300 dark:border-green-900/60' : 'bg-red-300/80 text-red-600 border-red-400/90 dark:bg-red-950 dark:text-red-300 dark:border-red-900/60'} flex items-center gap-1.5`}
					>
						{isOnline ? <Wifi /> : <WifiOff />}
						<span className="text-xs hidden md:block">
							{isOnline ? 'Con conexión' : 'Sin conexión'}
						</span>
					</div>
				</header>

				<main className="mt-5 bg-page-contrast shadow-2xl border-2 border-gray-400/20 rounded-lg px-6 py-10 md:p-10 ">
					<header>
						<h1 className="text-center text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
							Sin conexión con el servidor
						</h1>
						<p className="mt-2 text-center text-gray-600 dark:text-gray-400 text-sm md:text-base">
							No podemos establecer conexión con nuestro servidores en este
							momento
						</p>
					</header>

					<span className="flex items-center justify-between">
						<hr />
						<LogoSena className="size-8 mx-1 text-primary dark:text-dark-primary" />
						<hr />
					</span>

					<article className="flex flex-col gap-2 ">
						<div className="help-card">
							<header>
								<div>
									<Alert />
								</div>
								<h3>Posibles causas</h3>
							</header>

							<ul>
								<li>Tu conexión a internet está inactiva</li>
								<li>El servidor está en mantenimiento</li>
								<li>Problemas temporales de red</li>
							</ul>
						</div>

						<div className="help-card">
							<header>
								<div>
									<Refresh />
								</div>
								<h3>¿Qué hacer?</h3>
							</header>

							<ul>
								<li>Verifica tu conexión a internet</li>
								<li>Intenta recargar la página</li>
								<li>Espera unos minutos y vuelve a intentar</li>
							</ul>
						</div>
					</article>

					<Button
						showLoader
						loading={refreshing}
						className="[&_svg]:size-5 w-full max-w-[250px] mx-auto mt-6"
						onClick={handleRefresh}
					>
						<Refresh /> Reintentar conexión
					</Button>

					<hr className="my-6" />

					<footer className="text-center text-xs text-gray-600 dark:text-gray-400">
						Si el problema persiste, por favor{' '}
						{/* //TODO -> Cambiar el correo para usar el proveniente de la base de datos */}
						<a
							className="text-primary dark:text-dark-primary hover:underline cursor-pointer"
							href="mailto:soporte@cgao.gob.ec"
						>
							contacta a soporte técnico
						</a>
					</footer>
				</main>

				<span className="mx-auto w-fit block text-xs text-gray-600 dark:text-gray-400 mt-4">
					Código de Error:{' '}
					<strong className="text-primary dark:text-dark-primary">503</strong> -
					Servicio No Disponible
				</span>
			</section>
		</>
	)
}
