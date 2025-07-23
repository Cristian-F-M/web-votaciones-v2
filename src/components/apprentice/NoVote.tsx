import Calendar from '@/icons/Calendar'
import Bell from '@/icons/Bell'
import Mobile from '@/icons/Mobile'
import { useCallback, useState } from 'react'
import { useUser } from '@/states/useUser'

export function NoVote() {
	const user = useUser((state) => state.user)
	const maskedEmail = user?.email
		? (() => {
				const [username, domain] = user.email.split('@')
				return `${username.slice(0, 2)}****@${domain}`
			})()
		: ''

	const handleModal = useCallback((type: 'close' | 'open') => {
		const action = type === 'open' ? 'showModal' : 'close'
		document.querySelector('dialog')?.[action]()
	}, [])

	return (
		<>
			<div className="w-11/12 md:max-w-[600px] mx-auto flex flex-col justify-center items-center mt-10">
				<div className="p-2 bg-(--color)/20 rounded-full [&_svg]:size-6 [&_svg]:text-(--color) border border-(--color)/20 md:[&_svg]:size-8">
					<Calendar />
				</div>
				<div className="flex flex-col md:items-center border border-(--color)/40 rounded p-5 mt-6">
					<h2 className="text-xl font-semibold">No hay votaciones activas</h2>
					<h4 className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
						Actualmente no hay procesos de votación en curso
					</h4>
					<div className="text-gray-700 dark:text-gray-500 md:text-sm text-xs mt-2">
						<p>
							No te preocupes, te notificaremos cuando hayan nuevas votaciones
							disponibles.
						</p>
						<p>
							Mientras tanto, puedes configurar tus preferencias de notificación
						</p>
					</div>

					<div className="flex md:flex-row flex-col items-center justify-center gap-2 mt-6 w-full [&_button]:w-full [&_button]:md:w-fit [&_button]:rounded [&_button]:text-sm [&_button]:px-3 [&_button]:py-2 [&_button]:border [&_button]:transition-colors [&_button]:cursor-pointer [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:gap-1 [&_button_svg]:size-5">
						<button
							type="button"
							className="bg-(--color) hover:bg-(--color)/80 border-none active:bg-(--color)/60 active:dark:bg-(--color)/60"
							onClick={() => handleModal('open')}
						>
							<Bell />
							Activar notificaciones
						</button>
						<button
							type="button"
							className="border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600/30 active:bg-gray-200 dark:active:bg-gray-600/30"
						>
							<Mobile />
							Descargar app móvil
						</button>
					</div>
					<div className="mt-6 text-xs w-full bg-(--color)/20 rounded p-2 border border-(--color)/40 flex flex-col  dark:bg-(--color)/20 dark:border-(--color)/40">
						<h3 className="md:text-sm text-red-900 dark:text-red-100">
							¿Qué puedes hacer?
						</h3>
						<ul className="mt-1 text-red-800 dark:text-red-200 list-disc ml-4 md:text-sm text-xs">
							<li>Activar notificaciones por email</li>
							<li>Descargar nuestra app móvil para acceso ráído</li>
							<li>Revisar tu perfil y configuraciones de cuenta</li>
						</ul>
					</div>
				</div>
			</div>

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

			<dialog className="m-auto rounded shadow flex-col p-5 w-11/12 md:max-w-[450px]">
				<header className="flex flex-row gap-1 items-center ">
					<Bell className="text-(--color) size-5" />
					<h3 className="md:text-base text-sm font-semibold">
						Activar notificaciones por email
					</h3>
				</header>
				<main className="mt-px">
					<p className="text-gray-700 md:text-sm text-xs dark:text-gray-400">
						Se enviará un correo electrónico a{' '}
						<span className="text-(--color) font-semibold">{maskedEmail}</span>{' '}
						cuando haya nuevas votaciones
					</p>

					<div className="bg-(--color)/20 px-3 py-2 rounded mt-3 border border-(--color)/30 text-xs">
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
							className="bg-(--color) hover:bg-(--color)/80 dark:bg-(--color)/80 dark:hover:bg-(--color)/60 active:bg-(--color)/60 dark:active:bg-(--color)/60"
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
