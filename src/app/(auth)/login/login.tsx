'use client'
import { Input } from '@/components/Input'
import LogoSena from '@/icons/LogoSena'
import { ToggleTheme } from '@/components/ToggleTheme'
import type { GetTypeDocumentsResponse, LoginResponse } from '@/types/api'
import { useCallback, useEffect, useState } from 'react'
import { Select } from '@/components/Select'
import { doFetch } from '@/utils/fetch'
import { Checkbox } from '@/components/Checkbox'
import type { LoginErrors, LoginFormElements } from '@/types/forms'
import { getErrorEntries, getProcessedErrors } from '@/utils/form'
import { snackbar } from '@/utils/dom'
import { Loader } from '@/components/Loader'
import { useRouter } from 'next/navigation'
import type { TypeDocument } from '@/types/models'
import { Button } from '@/components/Button'

export default function Login() {
	const year = new Date().getFullYear()
	const [errors, setErrors] = useState<LoginErrors>({})
	const [typesDocuments, setTypesDocuments] = useState<TypeDocument[] | null>(
		null
	)
	const [isLogginIn, setIsLogginIn] = useState(false)
	const router = useRouter()

	const getTypeDocuments = useCallback(async () => {
		const res = await doFetch<GetTypeDocumentsResponse>({
			url: '/typeDocument',
			cache: 'force-cache'
		})

		if (!res.ok)
			return setErrors((prev) => ({
				...prev,
				typeDocument: 'Ocurrio un error al cargar los tipos de documento'
			}))

		setTypesDocuments(res.typesDocuments)
	}, [])

	const handleSubmit = useCallback(
		async (event: React.SyntheticEvent<HTMLFormElement>) => {
			event.preventDefault()
			if (isLogginIn)
				return snackbar({ message: 'Espera un momento', variant: 'warning' })
			const target = event.target as HTMLFormElement

			const { typeDocument, document, password, remember } =
				target.elements as LoginFormElements

			const locallyErrors: typeof errors = {}

			if (typeDocument.value === 'default-value')
				locallyErrors.typeDocument = 'Selecciona una opción de la lista'

			if (document.value.trim() === '')
				locallyErrors.document = 'Este campo es requrido'
			if (password.value.trim() === '')
				locallyErrors.password = 'Este campo es requrido'

			const locallyErrorsEntries = getErrorEntries(locallyErrors)

			if (locallyErrorsEntries.length > 0)
				return setErrors((prev) => ({ ...prev, ...locallyErrors }))

			await login(target.elements as LoginFormElements)
		},
		[isLogginIn]
	)

	const login = useCallback(
		async (elements: LoginFormElements) => {
			setIsLogginIn(true)
			const { typeDocument, document, password, remember } = elements

			const { ok, ...data } = await doFetch<LoginResponse>({
				url: '/login',
				method: 'POST',
				body: {
					typeDocumentCode: typeDocument.value,
					document: document.value,
					password: password.value,
					remember: remember.value
				}
			})

			setIsLogginIn(false)

			if (!ok) {
				if ('message' in data)
					snackbar({ message: data.message, variant: 'error' })
				if ('errors' in data) {
					const errors = getProcessedErrors(data.errors)
					setErrors(errors)
				}
				password.value = ''
				return
			}

			if ('urlRedirect' in data) return router.replace(data.urlRedirect)
			router.replace('/')
		},
		[router]
	)

	useEffect(() => {
		getTypeDocuments()
	}, [getTypeDocuments])

	const clearError = useCallback((key: keyof LoginFormElements) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	return (
		<>
			<link rel="stylesheet" href="/assets/css/form-ntw.css" />
			<main className="flex items-center justify-center w-full h-screen bg-page-bg">
				<div className="flex flex-row items-center rounded-sm max-h-10/12 md:h-full shadow shadow-gray-400 dark:shadow-gray-800 w-11/12 my-auto justify-center [&>div]:w-full [&>div]:p-4 [&>div]:md:min-w-[360px] max-w-[400px]  md:w-auto  md:max-w-[800px]">
					<div className="login bg-page-contrast h-full overflow-y-auto">
						<header className="w-full flex flex-col items-center justify-center">
							<div className="mb-5 flex flex-row gap-2 items-center text-primary">
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
						<form
							action=""
							className="w-full mt-10 space-y-9"
							onSubmit={handleSubmit}
						>
							<Select
								label="Tipo de documento"
								id="typeDocument"
								name="typeDocument"
								required
								error={errors.typeDocument}
								items={typesDocuments}
								onChange={() => {
									clearError('typeDocument')
								}}
							/>

							<Input
								label="Documento"
								id="document"
								name="document"
								required
								error={errors.document}
								type="number"
								onChange={() => {
									clearError('document')
								}}
							/>
							<div className="flex flex-col">
								<Input
									label="Contraseña"
									id="password"
									name="password"
									required
									error={errors.password}
									type="password"
									onChange={() => {
										clearError('password')
									}}
								/>
								<a
									href="/reset-password"
									className="text-sm md:text-xs transition-colors text-blue-500 dark:text-blue-400 underline md:no-underline md:hover:underline self-end"
								>
									¿Olvidaste tu contraseña?
								</a>
							</div>

							<div className="">
								<div className="mb-1">
									<Checkbox
										label="Recordar por 30 días"
										id="remember"
										name="remember"
									/>
								</div>
                <Button type="submit" showLoader={true} loading={isLogginIn} disabled={isLogginIn}>
                  Iniciar sesión
                </Button>
								<div className="space-x-1 text-sm mt-3 w-fit mx-auto">
									<span className="text-gray-500 dark:text-gray-300">
										¿No tienes una cuenta?
									</span>
									<a
										className="underline md:no-underline md:hover:underline text-primary"
										href="/register"
									>
										Registrate
									</a>
								</div>
							</div>
						</form>
					</div>
					<div className="information h-full hidden md:flex flex-col items-center justify-center relative">
						<div className="hidden dark:block absolute inset-0 bg-gray-700 z-0" />
						<div className="absolute inset-0 bg-primary-contrast dark:bg-dark-primary-contrast dark:text-dark-primary/60 z-10" />
						<div className="size-full z-50 md:flex flex-col items-center justify-center ">
							<LogoSena className="size-28 text-primary dark:text-dark-primary" />
							<h2 className="text-2xl bold text-gray-900 text-center dark:text-gray-300">
								Centro de Gestión Agroempresarial del Oriente
							</h2>
							<p className="text-center text-gray-700 text-sm mt-1 dark:text-gray-400">
								Accede a nuestra plataforma para realizar la votación de el
								candidato a representante de la jornada.
							</p>
							<div className="mt-auto text-xs text-gray-600 dark:text-gray-300">
								&copy; {year} SENA. Todos los derechos reservados.
							</div>
						</div>
					</div>
				</div>
				<div className="absolute top-2 right-2">
					<ToggleTheme />
				</div>
			</main>
		</>
	)
}
