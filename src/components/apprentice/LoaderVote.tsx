import { Loader } from '../Loader'

export function LoaderVote() {
	return (
		<div className="w-11/12 md:max-w-[600px] mx-auto flex flex-col items-center border border-primary dark:border-dark-primary/40 rounded p-5 mt-10">
			<h2 className="text-xl text-center md:text-2xl mt-2">
				Cargando información de la votación
			</h2>
			<h4 className="text-base text-center text-gray-700 dark:text-gray-500">
				Obteniendo los datos más recientes...
			</h4>
			<p className="text-gray-600 text-center mt-3 dark:text-gray-400">
				Estamos preparando toda la información necesaria para las votaciones.
				Por favor espera un momento mientras verificamos los datos.
			</p>
			<Loader className="size-10 text-primary mt-5" />
		</div>
	)
}
