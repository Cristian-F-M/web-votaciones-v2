import Bell from '@/icons/Bell'
import Check from '@/icons/Check'
import { useRef } from 'react'
import { ActivateNotificationsModal } from './ActivateNotificationsModal'

export function LoadingWinner() {
	const buttonTrigger = useRef<HTMLButtonElement>(null)

	return (
		<>
			<div className="w-11/12 md:max-w-[550px] mx-auto flex flex-col items-center mt-4">
				<div className="p-4 bg-green-500/20 rounded-full">
					<div className="bg-green-700 p-2 rounded-full text-white [&_svg]:size-7">
						<Check />
					</div>
				</div>

				<div className="w-full p-4 border border-(--color)/40 rounded mt-5">
					<header className="w-full flex flex-col items-center">
						<h1 className="text-2xl font-semibold text-green-700 dark:text-green-500">
							Votación Cerrada
						</h1>
						<h3 className="text-gray-700 dark:text-gray-400">
							El periodo de votación ha finalizado
						</h3>
					</header>

					<main className="mt-4 text-gray-600 dark:text-gray-500 text-center text-sm">
						<p>El proceso de votación ha concluido oficialmente.</p>
						<p>Se están procesando y calculando los resultados finales.</p>

						<button
							type="button"
							className="flex items-center gap-1 mt-4 mx-auto bg-(--color) text-white px-4 py-1.5 rounded [&_svg]:size-5 cursor-pointer hover:bg-(--color)/80 dark:hover:bg-(--color)/60 active:bg-(--color)/60 dark:active:bg-(--color)/60"
							ref={buttonTrigger}
						>
							<Bell />
							Recibir notificación
						</button>
					</main>

					<footer className="mt-4 text-sm text-center bg-blue-600/10 p-2 py-3 rounded border border-blue-300 dark:border-blue-700">
						<h5 className="text-sm font-semibold text-blue-600 dark:text-blue-300">
							📊 ¿Cuándo estarán los resultados?
						</h5>
						<p className="text-blue-800 dark:text-blue-400 text-xs w-11/12 mt-px">
							Los resultados oficiales se publicarán una vez que se cierre el
							período de votación y se verifiquen todos los votos. Te
							notificaremos por email cuando estén disponibles.
						</p>
					</footer>
				</div>
			</div>

			<ActivateNotificationsModal buttonTriggerRef={buttonTrigger} />
		</>
	)
}
