'use client'
import { Button } from '@/components/form/Button'
import {
	IconCalendar,
	IconBell,
	IconDeviceMobile,
	IconCheckbox,
	IconLogs
} from '@tabler/icons-react'
import { useRef } from 'react'
import '@/styles/no-election.css'
import { ActivateNotificationsModal } from '@/components/apprentice/ActivateNotificationsModal'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function NoElection() {
	const buttonTriggerRef = useRef<HTMLButtonElement>(null)

	return (
		<>
			<div className="w-11/12 md:max-w-[750px] mx-auto flex flex-col justify-center items-center mt-6">
				<div
					className="flex flex-col md:items-center border border-primary/40 rounded p-6 py-10 md:p-9 mt-6 
        dark:border-gray-700 dark:bg-dark-page-contrast bg-page-contrast"
				>
					<div className="w-fit p-2 bg-primary/20 rounded-full [&_svg]:size-6 [&_svg]:text-primary dark:[&_svg]:text-dark-primary border border-primary/20 dark:border-dark-primary/20 md:[&_svg]:size-8 mb-3 mx-auto">
						<IconCalendar />
					</div>
					<h1 className="text-xl md:text-3xl font-semibold text-center">
						No hay votaciones activas
					</h1>

					<div className="text-gray-700 dark:text-gray-400 text-pretty md:text-sm text-sm md:mt-6 mt-2 text-center">
						<p>
							Actualmente no hay votaciones disponibles. Activa las
							notificaciones para recibir alertas cuando se abran nuevas
							votaciones y poder participar.
						</p>
					</div>

					<div className="flex md:flex-row flex-col items-center justify-center gap-2 mt-6 w-11/12 md:w-8/12 mx-auto [&_button]:text-sm [&_svg]:size-5">
						<Button showLoader type="button" ref={buttonTriggerRef}>
							<IconBell />
							Activar notificaciones
						</Button>
						<Button
							type="button"
							showLoader={false}
							primary={false}
							onClick={() => {
								window.open(
									`${API_URL}/app-mobile`,
									'_blank',
									'noopener noreferrer'
								)
							}}
						>
							<IconDeviceMobile />
							Descargar app móvil
						</Button>
					</div>

					<hr />

					<div className="flex flex-col md:flex-row gap-3 items-center">
						<article className="info-card">
							<div>
								<IconCheckbox />
							</div>
							<main>
								<h4>Vota en tiempo real</h4>
								<p>
									Participa en votaciones activas y ve los resultado al
									finalizar la votación
								</p>
							</main>
						</article>
						<article className="info-card">
							<div>
								<IconDeviceMobile />
							</div>
							<main>
								<h4>Vota desde el móvil</h4>
								<p>Descarga la app y vota cómodamente desde tu teléfono</p>
							</main>
						</article>
						<article className="info-card">
							<div>
								<IconLogs />
							</div>
							<main>
								<h4>Historial completo</h4>
								<p>Consulta todas tus votaciones anteriores y sus resultados</p>
							</main>
						</article>
					</div>
				</div>
			</div>

			<span className="text-sm text-gray-600 dark:text-gray-400 mt-4 mx-auto w-11/12 text-center md:w-fit block mb-10">
				¿Necesitas ayuda?{' '}
				<a
					className="text-primary dark:text-dark-primary hover:underline md:no-underline underline"
					href="/support"
				>
					Visita nuestro centro de soporte
				</a>
			</span>

			<ActivateNotificationsModal buttonTriggerRef={buttonTriggerRef} />
		</>
	)
}
