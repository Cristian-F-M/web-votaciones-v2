'use client'
import { Button } from '@/components/Button'
import { CodeInput } from '@/components/CodeInput'
import type {
	PasswordResetGetDataResponse,
	PasswordResetSendCodeResponse,
	PasswordResetVerifyCodeResponse
} from '@/types/api'
import type {
	WriteCodeErrors,
	WriteCodeForm,
	WriteCodeFormValues
} from '@/types/forms'
import { snackbar, getStringTime } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { getProcessedErrors, serializeForm, validateForm } from '@/utils/form'
import { WRITE_CODE_SCHEME } from '@/zod-validations'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import {
	useResetPasswordData,
	ResetPasswordStep,
	useResetPasswordStep
} from '@/app/(auth)/reset-password/layout'
import { IconAlertCircle } from '@tabler/icons-react'

export function WriteCodePage() {
	const [seconds, setSeconds] = useState(0)
	const [nextSendAt, setNextSendAt] = useState<Date | null>(null)
	const [sendingEmail, setSendingEmail] = useState(false)
	const [errors, setErrors] = useState<Partial<WriteCodeErrors>>({})
	const [loading, setLoading] = useState(false)
	const searchParams = useSearchParams()
	const token = searchParams.get('token') as string
	const router = useRouter()
	const { setStep } = useResetPasswordStep()

	const sendPasswordResetCode = useCallback(async () => {
		const response = await doFetch<PasswordResetSendCodeResponse>({
			url: '/reset-password/send-code',
			method: 'POST',
			body: { token }
		})

		return response
	}, [token])

	const handleSendEmail = useCallback(async () => {
		if (seconds > 0) {
			return snackbar({
				message: `Esperando para enviar correo (${getStringTime(seconds)})`,
				variant: 'warning'
			})
		}

		if (sendingEmail)
			return snackbar({ message: 'Enviando correo', variant: 'warning' })

		setSendingEmail(true)
		const response = await sendPasswordResetCode()
		setSendingEmail(false)

		if (!response.ok) {
			snackbar({ message: response.message, variant: 'error' })

			// mostrar el tiempo restante
			if ('nextSendAt' in response && response.nextSendAt) {
				setNextSendAt(new Date(response.nextSendAt))
			}

			return
		}
	}, [sendingEmail, seconds, sendPasswordResetCode])

	const handleVerifyCode = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (sendingEmail || loading)
				return snackbar({ message: 'Espera un momento', variant: 'warning' })

			const form = event.currentTarget as WriteCodeForm
			const result = validateForm(form, WRITE_CODE_SCHEME)

			if (!result.success) {
				setErrors(result.errors)
				return
			}

			const serializedForm = serializeForm<WriteCodeFormValues>(form.elements)

			console.log({ serializedForm })

			setLoading(true)
			const response = await doFetch<PasswordResetVerifyCodeResponse>({
				url: '/reset-password/verify-code',
				method: 'POST',
				body: { code: serializedForm.code, token }
			})
			setLoading(false)

			const snackbarVariant = response.ok ? 'success' : 'error'
			snackbar({ message: response.message, variant: snackbarVariant })

			if (!response.ok) {
				if ('errors' in response && response.errors)
					return setErrors(getProcessedErrors(response.errors))

				if ('urlRedirect' in response && response.urlRedirect)
					router.push(response.urlRedirect)
				return
			}

			router.push(response.urlRedirect)
		},
		[loading, sendingEmail, token, router]
	)

	useEffect(() => {
		if (nextSendAt) {
			const seconds = Math.floor((nextSendAt.getTime() - Date.now()) / 1000)
			setSeconds(seconds)
		}
	}, [nextSendAt])

	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds <= 0) {
				setSeconds(0)
				clearInterval(interval)
				return
			}

			setSeconds((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [seconds])

	useEffect(() => {
		useResetPasswordData<PasswordResetGetDataResponse>(token).then(
			(response) => {
				if (!response.ok) {
					if ('errors' in response && response.errors)
						return setErrors(getProcessedErrors(response.errors))
					return
				}

				if (response.data.nextSendAt)
					setNextSendAt(new Date(response.data.nextSendAt))
				setStep(ResetPasswordStep.WRITE_CODE)
			}
		)
	}, [token, setStep])

	const clearError = useCallback((key: keyof WriteCodeErrors) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	return (
		<div>
			<div className="bg-red-100 p-2 rounded border border-red-300/80">
				<p className="text-xs text-pretty text-center [&_svg]:size-4 [&_svg]:inline-block [&_svg]:mr-1 text-red-900">
					<IconAlertCircle stroke={1.5} />
					Ten en cuenta de que el código de verificación tiene una validez de 6
					horas
				</p>
			</div>
			<form className="space-y-8 mt-8" onSubmit={handleVerifyCode}>
				<CodeInput
					className="mx-auto"
					size={6}
					id="code"
					name="code"
					onChange={() => clearError('code')}
				/>
				<div className="flex items-center gap-3">
					<Button
						type="button"
						primary={false}
						showLoader={true}
						onClick={handleSendEmail}
						disabled={seconds > 0}
						loading={sendingEmail}
					>
						Reenviar {seconds > 0 && `en ${getStringTime(seconds)}`}
					</Button>
					<Button showLoader={true} type="submit" loading={loading}>
						Enviar
					</Button>
				</div>
			</form>
		</div>
	)
}
