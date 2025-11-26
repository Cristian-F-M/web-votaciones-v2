'use client'
import { Input } from '@/components/Input'
import { Loader } from '@/components/Loader'
import { Select } from '@/components/Select'
import { ToggleTheme } from '@/components/ToggleTheme'
import LogoSena from '@/icons/LogoSena'
import { useCallback, useEffect, useState } from 'react'
import type {
	RegisterErrors,
	RegisterFormElements,
	ValidateFieldsProps
} from '@/types/forms'
import type { RegisterResponse, GetTypeDocumentsResponse, GetProcessedErrorsReturnType } from '@/types/api'
import { doFetch } from '@/utils/fetch'
import { snackbar } from '@/utils/dom'
import {
	getErrorEntries,
	getProcessedErrors,
	isEmailValid,
	isPasswordValid,
	parseZodMessages,
	serializeForm,
	validateFieldsNotEmpty
} from '@/utils/form'
import { scrollSmooth } from '@/utils/dom'
import { useRouter } from 'next/navigation'
import type { TypeDocument } from '@/types/models'
import { Button } from '@/components/Button'
import { PASSWORD_REGEX } from '@/constants/form'
import { REGISTER_SCHEME } from '@/zod-validations'
import * as z from 'zod'

export default function Register() {
	const router = useRouter()
	const [isRegistering, setIsRegistering] = useState(false)
	const [typesDocuments, setTypesDocuments] = useState<TypeDocument[] | null>(
		null
	)
	const [errors, setErrors] = useState<RegisterErrors>({})

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

	useEffect(() => {
		getTypeDocuments()
	}, [getTypeDocuments])

	const handleSubmit = useCallback(
		async (event: React.SyntheticEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (isRegistering)
				return snackbar({ message: 'Espera un momento', variant: 'warning' })

			const target = event.target as HTMLFormElement

			const {
				name,
				lastname,
				typeDocumentCode,
				document,
				email,
				phone,
				password,
				confirmPassword
			} = target.elements as RegisterFormElements

      const serializedForm = serializeForm<RegisterFormElements, GetProcessedErrorsReturnType>(target.elements as RegisterFormElements)
			const result = z.safeParse(REGISTER_SCHEME, serializedForm)

			if (!result.success) {
        const errors = parseZodMessages(result)
				setErrors(errors)
				return
			}

			let locallyErrors: typeof errors = {}

			locallyErrors = validateFieldsNotEmpty(
				target.elements as ValidateFieldsProps
			)

			if (!locallyErrors.email && !isEmailValid(email.value))
				locallyErrors.email = 'Ingresa un correo electronico válido '

			if (!locallyErrors.password && !isPasswordValid(password.value)) {
				locallyErrors.password =
					'Debe contener entre 8 y 20 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial.'
			}

			if (!locallyErrors.password && password.value !== confirmPassword.value) {
				locallyErrors.confirmPassword = 'Las contraseñas no coinciden'
				locallyErrors.password = 'Las contraseñas no coinciden'
			}

			const fullErrors = { ...errors, ...locallyErrors }
			const errorsEntries = getErrorEntries(fullErrors)

			if (errorsEntries.length >= 1) {
				const inputName = errorsEntries[0][0]
				scrollSmooth(`[name=${inputName}]`)
				setErrors(fullErrors)
				return
			}
      
      register(target.elements as RegisterFormElements)
		},
		[isRegistering, errors]
	)

	const register = useCallback(async (elements: RegisterFormElements) => {
		setIsRegistering(true)
    const serializedForm = serializeForm<RegisterFormElements, GetProcessedErrorsReturnType>(elements)
		const { ok, ...data } = await doFetch<RegisterResponse>({
			url: '/register',
			method: 'POST',
			body: serializedForm
		})
		setIsRegistering(false)

		if (!ok) {
			if (data.message)
				snackbar({ message: data.message })

			if ('errors' in data && data.errors) {
				const errors = getProcessedErrors(data.errors)
				setErrors(errors)
			}
			return
		}

		snackbar({ message: data.message, variant: 'success' })

		router.push('/login')
	}, [router])

	const clearError = useCallback((key: keyof RegisterFormElements) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	return (
		<>
			<link rel="stylesheet" href="/assets/css/form-ntw.css" />
			<main className="flex items-center justify-center w-full py-10">
				<div
					className="bg-page-contrast overflow-y-auto px-4 py-8 md:px-7 flex flex-col items-center rounded-sm md:h-full shadow shadow-gray-400
       dark:shadow-gray-800 w-11/12 my-auto md:min-w-80 max-w-[700px]"
				>
					<header className="w-full flex flex-col md:flex-row items-center justify-between">
						<div className="flex flex-col md:w-1/2 order-2 md:order-none">
							<h1 className="text-2xl md:text-2xl font-bold text-primary text-center md:text-left">
								Plataforma de Votaciones SENA
							</h1>
							<p className="text-gray-500 text-sm dark:text-gray-400 hidden md:block text-left">
								Centro de Gestión Agroempresarial del Oriente Regional Santander
							</p>
						</div>
						<div className="w-1/2 mb-5 flex-col gap-2 items-center text-primary flex order-1 md:order-none">
							<LogoSena className="size-28 md:size-24" />
							<span className="hidden md:block text-gray-800 dark:text-gray-200">
								CGAO
							</span>
						</div>
					</header>
					<form
						onSubmit={handleSubmit}
						className="w-full mt-10 md:mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 space-y-4"
            method="POST"
					>
						<Input
							label="Nombre"
							error={errors.name}
							id="name"
							name="name"
							type="text"
							required
							onChange={() => {
								clearError('name')
							}}
						/>
						<Input
							label="Apellido"
							name="lastname"
							error={errors.lastname}
							id="lastname"
							type="text"
							required
							onChange={() => {
								clearError('lastname')
							}}
						/>
						<Select
							error={errors.typeDocumentCode}
							items={typesDocuments}
							label="Tipo de documento"
							id="typeDocumentCode"
							name="typeDocumentCode"
							required
							onChange={() => {
								clearError('typeDocumentCode')
							}}
						/>

						<Input
							label="Documento"
							error={errors.document}
							id="document"
							name="document"
							type="number"
							required
							onChange={() => {
								clearError('document')
							}}
						/>
						<Input
							label="Telefono"
							error={errors.phone}
							id="phone"
							name="phone"
							type="tel"
							required
							onChange={() => {
								clearError('phone')
							}}
						/>
						<Input
							label="Correo"
							error={errors.email}
							id="email"
							name="email"
							type="email"
							required
							onChange={() => {
								clearError('email')
							}}
						/>
						<Input
							label="Contraseña"
							error={errors.password}
							id="password"
							name="password"
							type="password"
							buttonShowPassword
							required
							onChange={() => {
								clearError('password')
							}}
							pattern={PASSWORD_REGEX.source}
							title="Debe contener entre 8 y 20 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial."
						/>
						<Input
							label="Confirmar contraseña"
							error={errors.confirmPassword}
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							onChange={() => {
								clearError('confirmPassword')
							}}
						/>
						<div className="md:col-span-2">
              <Button type="submit" showLoader={true} loading={isRegistering} disabled={isRegistering} >
                Registrarse
              </Button>
							<div className="space-x-1 text-sm mt-3 w-fit mx-auto">
								<span className="text-gray-500 dark:text-gray-300">
									¿Ya tienes una cuenta?
								</span>
								<a
									className="underline md:no-underline md:hover:underline text-primary"
									href="/login"
								>
									Iniciar sesión
								</a>
							</div>
						</div>
					</form>
				</div>
				<div className="fixed top-2 right-2">
					<ToggleTheme />
				</div>
			</main>
		</>
	)
}
