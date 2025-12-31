'use client'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import {
	IconCalendar,
	IconBell,
	IconDeviceMobile,
	IconCheckbox,
	IconLogs,
	IconMail
} from '@tabler/icons-react'
import { doFetch } from '@/utils/fetch'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useUser } from '@/states/useUser'
import type { UserUpdateNotificationTokenResponse } from '@/types/api'
import { snackbar } from '@/utils/dom'
import '@/styles/no-election.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function NoElection() {
	const buttonTriggerRef = useRef<HTMLButtonElement>(null)
	const [areNotificationsActive, setAreNotificationsActive] = useState(false)
	const { user } = useUser()

	const handleSaveNotificationToken = useCallback(async () => {
		if (areNotificationsActive)
			return snackbar({
				message: 'Ya has activado las notificaciones',
				variant: 'warning'
			})

		const response = await doFetch<UserUpdateNotificationTokenResponse>({
			url: '/user/notification-token',
			method: 'PATCH',
			body: {
				deviceType: 'WEB',
				notificationToken: user?.email
			}
		})

		const variant = response.ok ? 'success' : 'error'

		snackbar({
			message: response.message,
			variant
		})

		setAreNotificationsActive(response.ok)
	}, [user, areNotificationsActive])

	useEffect(() => {
		if (!user) return
		setAreNotificationsActive(!!user.deviceToken)
	}, [user])

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
						<Button
							showLoader
							type="button"
							ref={buttonTriggerRef}
							disabled={areNotificationsActive}
						>
							<IconBell />
							{areNotificationsActive
								? 'Notificaciones activadas'
								: 'Activar notificaciones'}
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
							<header>
								<IconCheckbox />
								<h4>Vota en tiempo real</h4>
							</header>
							<main>
								<p>
									Participa en votaciones activas y ve los resultado al
									finalizar la votación
								</p>
							</main>
						</article>
						<article className="info-card">
							<header>
								<IconDeviceMobile />
								<h4>Vota desde el móvil</h4>
							</header>
							<main>
								<p>Descarga la app y vota cómodamente desde tu teléfono</p>
							</main>
						</article>
						<article className="info-card">
							<header>
								<IconLogs />
								<h4>Historial completo</h4>
							</header>
							<main>
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

			<Modal triggerRef={buttonTriggerRef}>
				{(closeModal, openModal) => (
					<>
						<header className="flex flex-col items-center justify-center gap-0.5">
							<span className="block text-primary dark:text-dark-primary [&_svg]:size-8 bg-primary/20 dark:bg-dark-primary/20 p-2 rounded-full">
								<IconBell />
							</span>
							<h2 className="text-xl font-semibold">Activar notificaciones</h2>
						</header>

						<main className="mt-2">
							<p className="text-sm text-gray-800 dark:text-gray-400 text-center text-pretty">
								Estás a punto de activar las notificaciones. Recibirás
								actualizaciones y alertas importantes en tu correo electrónico.
							</p>

							<div className="mt-2.5 text-center flex flex-row gap-2 items-center [&_svg]:size-5 [&_svg]:text-primary dark:[&_svg]:text-dark-primary [&_svg]:mt-0.5 w-fit mx-auto bg-gray-200/70 dark:bg-gray-700/70 border border-gray-300/70 dark:border-gray-600/70 px-3 py-2 rounded">
								<IconMail />{' '}
								<span className="text-sm text-gray-900 dark:text-gray-300">
									cfmorales.diaz@gmail.com
								</span>
							</div>

							<div className="mt-4 flex flex-row gap-2">
								<Button
									showLoader={false}
									type="button"
									primary={false}
									onClick={closeModal}
								>
									Cancelar
								</Button>
								<Button
									showLoader
									type="button"
									onClick={() => {
										closeModal()
										setTimeout(handleSaveNotificationToken, 200)
									}}
								>
									Activar
								</Button>
							</div>
						</main>
					</>
				)}
			</Modal>
		</>
	)
}
