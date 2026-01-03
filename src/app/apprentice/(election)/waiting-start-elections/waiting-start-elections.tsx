'use client'
import {
	IconAlertCircle,
	IconBell,
	IconCalendar,
	IconClock,
	IconUsers
} from '@tabler/icons-react'
import { useElection } from '@/states/useElection'
import { redirect, useRouter } from 'next/navigation'
import { CountDown } from '@/components/apprentice/CountDown'
import '@/styles/waiting-start-elections.css'
import { useUser } from '@/states/useUser'
import { Button } from '@/components/form/Button'
import { useEffect, useRef } from 'react'
import { snackbar } from '@/utils/dom'
import { ActivateNotificationsModal } from '@/components/apprentice/ActivateNotificationsModal'

export function WaitingStartElections() {
	const { election } = useElection()
	const { user } = useUser()
	const router = useRouter()
	const buttonTriggerRef = useRef<HTMLButtonElement>(null)

	if (!election) redirect('/apprentice/no-election')
	if (election.startAt > new Date()) redirect('/apprentice/vote')

	useEffect(() => {
		if (!election) return
		const startAt = election.startAt

		const interval = setInterval(() => {
			const now = new Date()

			if (now >= startAt) {
				clearInterval(interval)
				snackbar({ message: 'La votación ha comenzado', variant: 'success' })
				setTimeout(() => {
					return router.replace('/apprentice/vote')
				}, 2000)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [router, election])

	return (
		<>
			<section className="w-11/12 md:w-10/12 mx-auto mt-10 flex flex-col items-center">
				<div className="flex flex-row items-center gap-1 text-sm bg-primary/70 dark:bg-dark-primary/50 [&_svg]:size-4 w-fit mx-auto px-3 py-1.5 rounded-lg">
					<IconClock />
					<h5>Votación activa - Proximamente</h5>
				</div>

				<header className="mt-4">
					<h1 className="text-2xl md:text-6xl font-semibold text-center">
						La votación comenzará pronto
					</h1>
					<h4 className="text-xs md:text-base text-center mt-1 text-gray-600 dark:text-gray-400">
						Prepárate para participar en la próxima votación comunitaria. Tu voz
						importa y cada voto cuenta
					</h4>
				</header>

				<main className="mt-10 w-full md:w-10/12 mx-auto place-items-center">
					<div className="bg-page-contrast p-8 w-full mx-auto flex flex-col items-center rounded-lg border dark:border-gray-700/70 border-gray-300/70 shadow-lg">
						<header className="flex flex-col gap-0">
							<h2 className="text-3xl font-semibold text-center">
								Cuenta regresiva
							</h2>
							<p className="text-gray-400 text-center text-sm">
								Tiempo restante hasta el inicio
							</p>
						</header>
						<CountDown
							className="mt-2"
							targetDate={new Date(new Date().getTime() + 60 * 60 * 2 * 1000)}
						/>
					</div>
					<div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-2 w-full">
						<div className="info-card bg-page-contrast">
							<div>
								<div className="info-card--icon">
									<IconCalendar />
								</div>
							</div>
							<main>
								<h4>Fecha de inicio</h4>
								<p>
									{new Date(
										new Date().getTime() + 60 * 60 * 2 * 1000
									).toLocaleString('es-CO', {
										day: 'numeric',
										weekday: 'long',
										month: 'long',
										year: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
										timeZone: 'America/Bogota'
									})}
								</p>
							</main>
						</div>
						<div className="info-card bg-page-contrast">
							<div>
								<div className="info-card--icon">
									<IconUsers />
								</div>
							</div>
							<main>
								<h4>Participantes esperados</h4>
								<p>
									Se espera una alta participación de la comunidad en esta
									votación importante.
								</p>
							</main>
						</div>
					</div>

					<div className="info-card mt-4 bg-page-contrast w-full">
						<div>
							<div className="info-card--icon">
								<IconAlertCircle />
							</div>
						</div>
						<main>
							<h4>Información importante</h4>
							<ul>
								<li>
									Ten en cuenta que no podras cambiar tu voto una vez confirmado
								</li>
								<li>
									Podrás revisar todas las opciones antes de confirmar tu voto
								</li>
								<li>
									La infomación de tu voto será confidencial y no podrá ser
									vista por nadie.
								</li>
								<li>
									Recibirás una notificación cuando la votación esté activa
								</li>
							</ul>
						</main>
					</div>
				</main>

				{!user?.deviceToken && (
					<Button
						showLoader={false}
						className="w-fit mt-10 [&_svg]:size-4"
						ref={buttonTriggerRef}
					>
						<IconBell /> Activar notificaciones
					</Button>
				)}
			</section>
			<footer className="mt-24 bg-page-contrast w-full text-center py-6 px-4 text-xs md:text-sm text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
				&copy; {new Date().getFullYear()} Votaciones. Todos los derechos
				reservados.
			</footer>

			<ActivateNotificationsModal buttonTriggerRef={buttonTriggerRef} />
		</>
	)
}
