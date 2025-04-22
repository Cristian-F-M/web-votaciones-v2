'use client'
import { Input } from '@/components/Input'
import LogoSena from '@/icons/LogoSena'
import '@/assets/css/login.css'
import { ToggleTheme } from '@/icons/ToggleThem'
import type { GetTypeDocumentsResponse, TypeDocument } from '@/types/api'
import { useCallback, useEffect, useState } from 'react'
import { Select } from '@/components/Select'
import { doFetch } from '@/utils/fetch'

export default function Login() {
	const year = new Date().getFullYear()
	const [errors, setErrors] = useState<{ [key: string]: string | null }>({})
	const [typesDocuments, setTypesDocuments] = useState<TypeDocument[] | null>(
		null
	)

	const getTypeDocuments = useCallback(async () => {
		const res = await doFetch<GetTypeDocumentsResponse>('/typeDocument', {
			method: 'GET',
			cache: 'force-cache'
		})

		if (!res.ok)
			return setErrors((prev) => ({
				...prev,
				typeDocument: 'Ocurrio un error al cargar los tipos de documento'
			}))

		setTypesDocuments(res.typesDocuments)
	}, [])

	useEffect(() => {
		getTypeDocuments()
	}, [getTypeDocuments])

	return (
		<main className="flex items-center justify-center w-full h-screen">
			<div className="flex flex-row items-center rounded-sm max-h-10/12 md:h-full shadow shadow-gray-400 dark:shadow-gray-800 w-11/12 my-auto justify-center [&>div]:w-full [&>div]:p-4 [&>div]:md:min-w-[360px] max-w-[400px]  md:w-auto  md:max-w-[800px]">
				<div className="login dark:bg-zinc-700 h-full overflow-y-auto">
					<header className="w-full flex flex-col items-center justify-center">
						<div className="mb-5 flex flex-row gap-2 items-center text-[var(--color)]">
							<LogoSena className="size-28 md:size-6" />
							<span className="hidden md:block text-gray-800 dark:text-gray-200">
								CGAO
							</span>
						</div>
						<h2 className="font-semibold text-3xl dark:text-gray-50">
							Bienvenidos
						</h2>
						<p className="text-gray-500 text-sm dark:text-gray-400 text-center">
							Ingresa tus crendenciales para acceder
						</p>
					</header>
					<form action="" className="w-full mt-10 space-y-9">
						{!typesDocuments && (
							<Select
								mode="fallback"
								label="Cargando..."
								error={errors.typeDocument}
							/>
						)}
						{typesDocuments && (
							<Select
								label="Tipo de documento"
								id="typeDocument"
								name="typeDocument"
								required
								error={errors.typeDocument}
								items={typesDocuments}
								selectedItem="0"
								mode="normal"
							/>
						)}

						<Input
							label="Documento"
							id="document"
							name="document"
							required
							error={errors.document}
							type="number"
						/>
						<div className="flex flex-col">
							<Input
								label="Contraseña"
								id="password"
								name="password"
								required
								error={errors.password}
								type="password"
							/>
							<a
								href="/reset-password"
								className="text-sm md:text-xs transition-colors text-blue-500 visited:text-indigo-800 dark:text-blue-400 underline md:no-underline md:hover:underline self-end"
							>
								¿Olvidaste tu contraseña?
							</a>
						</div>

						<div className="">
							<button
								className="w-full h-10 px-4 py-2 rounded transition-all hover:brightness-95 active:brightness-95 cursor-pointer text-gray-950 dark:text-white bg-[var(--color)]"
								type="submit"
							>
								Iniciar sesión
							</button>
							<div className="space-x-1 text-sm mt-3 w-fit mx-auto">
								<span className="text-gray-500 dark:text-gray-300">
									¿No tienes una cuenta?
								</span>
								<a
									className="visited:text-indigo-800 underline md:no-underline md:hover:underline text-[var(--color)]"
									href="/register"
								>
									Registrate
								</a>
							</div>
						</div>
					</form>
				</div>
				<div className="information h-full hidden md:flex flex-col items-center justify-center bg-[var(--color)]/50">
					<LogoSena className="size-28 text-[var(--color)]" />
					<h2 className="text-2xl bold text-gray-900 text-center dark:text-gray-50">
						Centro de Gestión Agroempresarial del Oriente
					</h2>
					<p className="text-center text-gray-700 text-sm mt-1 dark:text-gray-300">
						Accede a nuestra plataforma para realizar la votación de el
						candidato a representante de la jornada.
					</p>
					<div className="mt-auto text-xs text-gray-600 dark:text-gray-300">
						&copy; {year} SENA. Todos los derechos reservados.
					</div>
				</div>
			</div>
			<div className="absolute top-2 right-2">
				<ToggleTheme />
			</div>
		</main>
	)
}
