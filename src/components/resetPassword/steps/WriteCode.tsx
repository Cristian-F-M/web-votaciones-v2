import Alert from '@/icons/Alert'
import type { StepProps } from './FindUser'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import type {
	FindUserUser,
	SendPasswordResetCodeResponse,
	VerifyPasswordResetCodeResponse
} from '@/types/api'
import { useCallback, useEffect, useState } from 'react'
import { doFetch } from '@/utils/fetch'
import { getStringTime } from '@/utils/dom'
import { snackbar } from '@/utils/dom'
import type { WriteCodeErrors, WriteCodeFormElements } from '@/types/forms'
import { getErrorEntries, getProcessedErrors } from '@/utils/form'

interface WriteCodeProps extends Omit<StepProps, 'onComplete'> {
	user: FindUserUser | null
	onComplete: (code: string) => void
	dateNewCode: Date | null
}

export function WriteCode({
	onComplete,
	user,
	dateNewCode: dateNewCodeProp
}: WriteCodeProps) {
	const [seconds, setSeconds] = useState(0)
	const [dateNewCode, setDateNewCode] = useState<Date | null>(dateNewCodeProp)
	const [sendingEmail, setSendingEmail] = useState(false)
	const [errors, setErrors] = useState<Partial<WriteCodeErrors>>({})
	const [loading, setLoading] = useState(false)

	const sendPasswordResetCode = useCallback(async () => {
		const data = await doFetch<SendPasswordResetCodeResponse>({
			url: '/user/send-password-reset-code',
			method: 'POST',
			body: { userId: user?.id }
		})

		return data
	}, [user])

	const handleSendEmail = useCallback(async () => {
		if (seconds > 0) {
			return snackbar({
				message: `Esperando para enviar correo (${getStringTime(seconds)})`,
				variant: 'warning'
			})
		}

		if (sendingEmail || !user)
			return snackbar({ message: 'Enviando correo', variant: 'warning' })

		setSendingEmail(true)
		const data = await sendPasswordResetCode()
		setSendingEmail(false)

		if (!data.ok) {
			snackbar({ message: data.message, variant: 'error' })

			// mostrar el tiempo restante
			if ('timeNewCode' in data && data.timeNewCode) {
				setDateNewCode(new Date(data.timeNewCode))
			}

			return
		}
	}, [sendingEmail, user, seconds, sendPasswordResetCode])

	useEffect(() => {
		if (dateNewCode) {
			const seconds = Math.floor((dateNewCode.getTime() - Date.now()) / 1000)
			setSeconds(seconds)
		}
	}, [dateNewCode])

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

	const handleSendCode = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (sendingEmail || loading)
				return snackbar({ message: 'Espera un momento', variant: 'warning' })

			const form = event.currentTarget as HTMLFormElement
			const { code } = form.elements as WriteCodeFormElements

			const locallyErros: Partial<WriteCodeErrors> = {}

			if (code.value.trim() === '') {
				locallyErros.code = 'El código es requerido'
			}

			setErrors((prev) => ({ ...prev, ...locallyErros }))

			const locallyErrorsEntries = getErrorEntries(locallyErros)
			const errorsEntries = getErrorEntries(errors)

			if (locallyErrorsEntries.length > 0 || errorsEntries.length > 0) return

			setLoading(true)
			const data = await doFetch<VerifyPasswordResetCodeResponse>({
				url: '/user/verify-password-reset-code',
				method: 'POST',
				body: { code: code.value, userId: user?.id }
			})
			setLoading(false)

			if (!data.ok) {
				if ('errors' in data && data.errors) {
					const newErrors = getProcessedErrors(data.errors)
					setErrors(newErrors)
				}

				snackbar({ message: data.message, variant: 'error' })
				return
			}

			onComplete(code.value)
		},
		[errors, loading, sendingEmail, onComplete, user]
	)

	const clearError = useCallback((key: keyof WriteCodeErrors) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	return (
		<div>
			<div className="bg-red-100 p-2 rounded border border-red-300/80">
				<p className="text-xs text-pretty text-center [&_svg]:size-4 [&_svg]:inline-block [&_svg]:mr-1 text-red-900">
					<Alert />
					Ten en cuenta de que el código de verificación tiene una validez de 6
					horas
				</p>
			</div>
			<form className="space-y-8 mt-8" onSubmit={handleSendCode}>
				<Input
					className="uppercase"
					type="text"
					label="Código"
					name="code"
					id="code"
					error={errors.code}
					onChange={() => clearError('code')}
					required
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
