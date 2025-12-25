'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import type {
	PasswordResetGetDataResponse,
	PasswordResetUpdateResponse
} from '@/types/api'
import type {
	UpdatePasswordForm,
	UpdatePasswordErrors,
	UpdatePasswordFormValues
} from '@/types/forms'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { getProcessedErrors, serializeForm, validateForm } from '@/utils/form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import {
	useResetPasswordData,
	ResetPasswordStep,
	useResetPasswordStep
} from '@/app/(auth)/reset-password/layout'
import { UPDATE_PASSWORD_SCHEME } from '@/zod-validations'

export function UpdatePasswordPage() {
	const [errors, setErrors] = useState<UpdatePasswordErrors>({})
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams.get('token') as string
	const { setStep } = useResetPasswordStep()

	const handleUpdatePassword = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			const form = event.currentTarget as UpdatePasswordForm
			const serializedForm = serializeForm<UpdatePasswordFormValues>(
				form.elements
			)

			const result = validateForm(form, UPDATE_PASSWORD_SCHEME)

			if (!result.success) {
				setErrors(result.errors)
				return
			}

			const response = await doFetch<PasswordResetUpdateResponse>({
				url: '/reset-password/update-password',
				method: 'PATCH',
				body: { ...serializedForm, token }
			})

			const snackbarVariant = response.ok ? 'success' : 'error'
			snackbar({ message: response.message, variant: snackbarVariant })

			if (!response.ok) {
				if (response.errors) setErrors(getProcessedErrors(response.errors))
				return
			}

			return router.push(response.urlRedirect)
		},
		[router, token]
	)

	const clearError = useCallback((key: keyof UpdatePasswordErrors) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	useEffect(() => {
		useResetPasswordData(token).then(() =>
			setStep(ResetPasswordStep.UPDATE_PASSWORD)
		)
	}, [token, setStep])

	return (
		<div className="mt-1">
			<form className="space-y-9" onSubmit={handleUpdatePassword}>
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
