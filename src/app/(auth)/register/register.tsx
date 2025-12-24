'use client'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { ToggleTheme } from '@/components/ToggleTheme'
import LogoSena from '@/icons/LogoSena'
import { useCallback, useEffect, useState } from 'react'
import type { RegisterErrors, RegisterForm } from '@/types/forms'
import type {
	AuthRegisterResponse,
	TypeDocumentGetAllResponse,
	ProcessedErrors,
	ShiftTypeGetAllResponse
} from '@/types/api'
import { doFetch } from '@/utils/fetch'
import { snackbar } from '@/utils/dom'
import { getProcessedErrors, serializeForm, validateForm } from '@/utils/form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { PASSWORD_REGEX } from '@/constants/form'
import { REGISTER_SCHEME } from '@/zod-validations'
import type { SelectItem } from '@/types/input'

export default function Register() {
	const router = useRouter()
	const [isRegistering, setIsRegistering] = useState(false)
	const [typesDocuments, setTypesDocuments] = useState<SelectItem[] | null>(
		null
	)
	const [errors, setErrors] = useState<RegisterErrors>({})
	const [shiftTypes, setShiftTypes] = useState<SelectItem[] | null>(null)

	const getTypeDocuments = useCallback(async () => {
		const response = await doFetch<TypeDocumentGetAllResponse>({
			url: '/typeDocument/all'
		})

		if (!response.ok)
			return setErrors((prev) => ({
				...prev,
				typeDocument: 'Ocurrio un error al cargar los tipos de documento'
			}))

		const typeDocumentItems = response.data.map(({ id, code, name }) => ({
			id,
			value: code,
			name
		}))

		setTypesDocuments(typeDocumentItems)
	}, [])

	const getShiftTypes = useCallback(async () => {
		const response = await doFetch<ShiftTypeGetAllResponse>({
			url: '/shiftType/all'
		})

		if (!response.ok)
			return setErrors((prev) => ({
				...prev,
				shiftType: 'Ocurrio un error al cargar las jornadas'
			}))

		const shiftTypeItems = response.data.map(({ id, code, name }) => ({
			id,
			value: code,
			name
		}))

		setShiftTypes(shiftTypeItems)
	}, [])

	useEffect(() => {
		getTypeDocuments()
	}, [getTypeDocuments])

	useEffect(() => {
		getShiftTypes()
	}, [getShiftTypes])

	const handleSubmit = useCallback(
		async (event: React.SyntheticEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (isRegistering)
				return snackbar({ message: 'Espera un momento', variant: 'warning' })

			const form = event.target as RegisterForm

			const result = validateForm(form, REGISTER_SCHEME)

			if (!result.success) {
				setErrors(result.errors)
				return
			}

			register(form)
		},
		[isRegistering]
	)

	const register = useCallback(
		async (form: RegisterForm) => {
			const elements = form.elements
			const serializedForm = serializeForm<ProcessedErrors>(elements)

			setIsRegistering(true)

			const response = await doFetch<AuthRegisterResponse>({
				url: '/register',
				method: 'POST',
				body: serializedForm
			})
			setIsRegistering(false)

			if (!response.ok) {
				snackbar({ message: response.message })

				if (response.errors) {
					const errors = getProcessedErrors(response.errors)
					setErrors(errors)
				}
				return
			}

			snackbar({ message: response.message, variant: 'success' })

			router.push('/login')
		},
		[router]
	)

	const clearError = useCallback((key: keyof RegisterErrors) => {
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

						<Select
							error={errors.shiftTypeCode}
							items={shiftTypes}
							label="Jornada"
							id="shiftTypeCode"
							name="shiftTypeCode"
							required
							onChange={() => {
								clearError('shiftTypeCode')
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
							error={errors.passwordConfirmation}
							id="passwordConfirmation"
							name="passwordConfirmation"
							type="password"
							required
							onChange={() => {
								clearError('passwordConfirmation')
							}}
						/>
						<div className="md:col-span-2">
							<Button
								type="submit"
								showLoader={true}
								loading={isRegistering}
								disabled={isRegistering}
							>
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
