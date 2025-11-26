import ShieldX from '@/icons/ShieldX'
import AlertIcon from '@/icons/Alert'
import House from '@/icons/House'
import CaretDown from '@/icons/CaretDown'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useUser } from '@/states/useUser'

export function Forbidden() {
	const [showDetails, setShowDetails] = useState(false)
	const pathname = usePathname()
	const user = useUser((state) => state.user)
	const timeStamp = useMemo(
		() =>
			new Date().toLocaleString('es-ES', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}),
		[]
	)

	return (
		<div className="mx-auto w-8/12 mt-10 flex flex-col items-center mb-14">
			<style>{`
				.details {
					transition: all 0.2s ease allow-discrete;
					interpolate-size: allow-keywords;
				}

				.details.show {
					height: auto;
				}

				.details.show .details-marker svg {
					transform: rotate(0);
				}
					
				.details .details-marker svg {
					transform: rotate(-90deg);
				}

			`}</style>
			<div className="p-4 rounded-full bg-(--color)/20 [&_svg]:text-(--color) [&_svg]:size-10">
				<ShieldX />
			</div>
			<div className="rounded border border-(--color)/80 p-4 w-8/12 mt-6 flex flex-col items-center gap-1 px-6">
				<header className="flex flex-row gap-1.5 items-center text-(--color) [&_svg]:size-6">
					<AlertIcon />
					<h1 className="text-2xl font-semibold -mt-1">Acceso denegado</h1>
				</header>
				<h3 className="text-gray-800 dark:text-gray-300">
					No tienes permisos para acceder a esta página
				</h3>

				<div className="text-gray-600 text-center dark:text-gray-500">
					<p>
						Lo sentimos, pero no tienes los permisos necesarios para ver este
						contenido.
					</p>

					<p>
						Si crees que esto es un error, por favor contacta al administrador
						del sistema.
					</p>
				</div>

				<a
					className="bg-(--color) w-fit flex flex-row gap-1 items-center px-4 py-2 rounded [&_svg]:size-5 text-white mt-3 hover:bg-(--color)/80 transition-colors dark:bg-(--color)/90 hover:dark:bg-(--color)/70"
					href="/"
				>
					<House />
					Ir a inicio
				</a>

				<div className="bg-(--color)/10 dark:bg-(--color)/10 border border-(--color) rounded px-4 py-3 mt-6 flex flex-col items-center">
					<h4 className="text-lg text-red-800 font-semibold dark:text-red-700">
						¿Necesitas acceso?
					</h4>
					<p className="text-sm text-center text-red-900 dark:text-red-800">
						Si necesitas acceso a esta sección, solicita los permisos
						correspondientes a tu administrador o verifica que tu rol de usuario
						sea el correcto.
					</p>
				</div>

				<div
					className={`details self-start mt-6 w-full h-8 overflow-hidden text-sm ${showDetails ? 'show' : ''}`}
				>
					<div
						onClick={() => setShowDetails((prev) => !prev)}
						className="details-marker flex flex-row items-center cursor-pointer transition [&_svg]:size-4 [&_svg]:text-gray-600 hover:bg-gray-200 py-1 rounded h-8 dark:hover:bg-gray-900 dark:[&_svg]:text-gray-400"
					>
						<CaretDown />
						<span>Detalles técnicos</span>
					</div>

					<div className="details-content flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-gray-300 w-full py-2 px-2 rounded mt-1 [&_span]:flex [&_span]:gap-1 [&_span_strong]:font-semibold text-sm gap-0.5 [&_span]:text-ellipsis overflow-hidden [&_span]:whitespace-nowrap">
						<span>
							<strong>Código de error:</strong> 403 Forbidden
						</span>
						<span>
							<strong>URL solicitada:</strong> {pathname}
						</span>
						<span>
							<strong>Usuario:</strong> {user?.name ?? '~'} {user?.lastname} (
							{user?.roleUser.name ?? '~'})
						</span>
						<span>
							<strong>Timestamp:</strong>
							{timeStamp}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
