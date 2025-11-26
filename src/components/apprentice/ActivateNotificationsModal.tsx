import Bell from '@/icons/Bell'
import { useUser } from '@/states/useUser'
import { useCallback, useEffect } from 'react'

export function ActivateNotificationsModal({
	buttonTriggerRef
}: { buttonTriggerRef: React.RefObject<HTMLButtonElement | null> }) {
	const user = useUser((state) => state.user)
	const maskedEmail = user?.email
		? (() => {
				const [username, domain] = user.email.split('@')
				return `${username.slice(0, 2)}****@${domain}`
			})()
		: ''

	const handleClick = useCallback((event: MouseEvent) => {
		event.preventDefault()
		handleModal('open')
	}, [])

	useEffect(() => {
		buttonTriggerRef.current?.addEventListener('click', handleClick)
		return () => {
			buttonTriggerRef.current?.removeEventListener('click', handleClick)
		}
	}, [buttonTriggerRef, handleClick])

	const handleModal = useCallback((type: 'close' | 'open') => {
		const action = type === 'open' ? 'showModal' : 'close'
		const modal = document.querySelector(
			'#activate-notifications-modal'
		) as HTMLDialogElement

		modal?.[action]()
	}, [])

	return (
		<>
			<style>{`
      dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

        dialog[open] {
          display: flex;
          scale: 1;
          opacity: 1;


          @starting-style {
            scale: 0.8;
            opacity: 0;
          }
        }


        dialog {
          display: none;
          scale: 0.8;
          opacity: 0;
          transition: all 0.3s allow-discrete;
        }

    `}</style>

			<dialog
				className="m-auto rounded shadow flex-col p-5 w-11/12 md:max-w-[450px]"
				id="activate-notifications-modal"
			>
				<header className="flex flex-row gap-1 items-center ">
					<Bell className="text-primary size-5" />
					<h3 className="md:text-base text-sm font-semibold">
						Activar notificaciones por email
					</h3>
				</header>
				<main className="mt-px">
					<p className="text-gray-700 md:text-sm text-xs dark:text-gray-400">
						Se enviará un correo electrónico a{' '}
						<span className="text-primary dark:text-dark-primary font-semibold">
							{maskedEmail}
						</span>{' '}
						cuando haya nuevas votaciones
					</p>

					<div className="bg-primary/20 px-3 py-2 rounded mt-3 border border-primary/30 text-xs">
						<p>
							📧 Recibiras una notificación inmediata cuando se abran nuevos
							procesos de votacion.
						</p>
					</div>

					<div className="mt-3 flex md:flex-row flex-col-reverse gap-2 justify-end [&_button]:px-3 [&_button]:py-1.5 [&_button]:rounded [&_button]:text-sm [&_button]:cursor-pointer">
						<button
							className="border border-gray-300 hover:bg-gray-300/30 dark:border-gray-600 dark:hover:bg-gray-600/30 active:bg-gray-300/30 dark:active:bg-gray-600/30"
							type="button"
							onClick={() => handleModal('close')}
						>
							Cancelar
						</button>
						<button
							className="bg-primary hover:bg-primary/80 dark:bg-dark-primary/80 dark:hover:bg-dark-primary/60 active:bg-primary/60 dark:active:bg-dark-primary/60"
							type="button"
						>
							Activar notificaciones
						</button>
					</div>
				</main>
			</dialog>
		</>
	)
}
