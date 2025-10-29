import { Input } from '@/components/Input'
import type { StepProps } from './FindUser'
import { Button } from '@/components/Button'
import { useCallback, useState } from 'react'
import type { WritePasswordErrors, WritePasswordElements } from '@/types/forms'
import { getErrorEntries, getProcessedErrors } from '@/utils/form'
import { doFetch } from '@/utils/fetch'
import type { FindUserUser, UpdatePasswordResponse } from '@/types/api'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

interface WritePasswordStepProps extends Omit<StepProps, 'onComplete'> {
	code: string | null
	user: FindUserUser | null
}

export function WritePassword({ user, code }: WritePasswordStepProps) {
	const [errors, setErrors] = useState<Partial<WritePasswordErrors>>({})
	const router = useRouter()

	const handleSubmitResetPassword = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			const form = event.currentTarget as HTMLFormElement
			const { password, passwordConfirmation } =
				form.elements as WritePasswordElements

			const locallyErrors: Partial<WritePasswordErrors> = {}

			if (password.value.trim() === '') {
				locallyErrors.password = 'La contraseña es requerida'
			}

			if (passwordConfirmation.value.trim() === '') {
				locallyErrors.passwordConfirmation =
					'La confirmación de la contraseña es requerida'
			}

			if (password.value !== passwordConfirmation.value) {
				locallyErrors.passwordConfirmation = 'Las contraseñas no coinciden'
			}

			setErrors((prev) => ({ ...prev, ...locallyErrors }))

			const locallyErrorsEntries = getErrorEntries(locallyErrors)
			const errorsEntries = getErrorEntries(errors)

			if (locallyErrorsEntries.length > 0 || errorsEntries.length > 0) return

			const data = await doFetch<UpdatePasswordResponse>({
				url: '/user/update-password',
				method: 'PUT',
				body: {
					password: password.value,
					passwordConfirmation: passwordConfirmation.value,
					userId: user?.id,
					code
				}
			})

			if (!data.ok) {
				if ('errors' in data && data.errors) {
					const newErrors = getProcessedErrors(data.errors)
					setErrors(newErrors)
				}

				enqueueSnackbar(data.message, {
					variant: 'error',
					autoHideDuration: 2000,
					preventDuplicate: true
				})
				return
			}

			enqueueSnackbar('Contraseña restablecida', {
				variant: 'success',
				autoHideDuration: 2000,
				preventDuplicate: true
			})

			if ('urlReturn' in data && data.urlReturn)
				return router.push(data.urlReturn)
			router.push('/login')
		},
		[errors, user, code, router]
	)

	const clearError = useCallback((key: keyof WritePasswordErrors) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	return (
		<div className="mt-1">
			<form className="space-y-9" onSubmit={handleSubmitResetPassword}>
				<Input
					type="password"
					label="Contraseña"
					name="password"
					id="password"
					error={errors.password}
					required
					buttonShowPassword
					onChange={() => clearError('password')}
				/>
				<Input
					type="password"
					label="Confirmar contraseña"
					name="passwordConfirmation"
					id="confirm-password"
					error={errors.passwordConfirmation}
					required
					onChange={() => clearError('passwordConfirmation')}
				/>

				<Button type="submit" showLoader={true}>
					Restablecer
				</Button>
			</form>
		</div>
	)
}
