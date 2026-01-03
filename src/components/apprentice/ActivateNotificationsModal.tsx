'use client'
import { useUser } from '@/states/useUser'
import { useCallback, useEffect, useState } from 'react'
import { IconBell, IconMail } from '@tabler/icons-react'
import { Modal } from '../Modal'
import { Button } from '../form/Button'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import type { UserUpdateNotificationTokenResponse } from '@/types/api'

export function ActivateNotificationsModal({
	buttonTriggerRef
}: { buttonTriggerRef: React.RefObject<HTMLButtonElement | null> }) {
	const [areNotificationsActive, setAreNotificationsActive] = useState(false)
	const [activatingNotifications, setActivatingNotifications] = useState(false)
	const { user } = useUser()

	const handleSaveNotificationToken = useCallback(async () => {
		if (areNotificationsActive)
			return snackbar({
				message: 'Ya has activado las notificaciones',
				variant: 'warning'
			})

		setActivatingNotifications(true)
		const response = await doFetch<UserUpdateNotificationTokenResponse>({
			url: '/user/notification-token',
			method: 'PATCH',
			body: {
				deviceType: 'WEB',
				notificationToken: user?.email
			}
		})
		setActivatingNotifications(false)

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
							{!areNotificationsActive && (
								<Button
									showLoader={false}
									type="button"
									primary={false}
									onClick={closeModal}
								>
									Cancelar
								</Button>
							)}
							<Button
								showLoader
								type="button"
								disabled={activatingNotifications || areNotificationsActive}
								onClick={() => {
									closeModal()
									setTimeout(handleSaveNotificationToken, 200)
								}}
							>
								{!areNotificationsActive
									? 'Activar'
									: 'Ya has hactivado las notificaciones'}
							</Button>
						</div>
					</main>
				</>
			)}
		</Modal>
	)
}
