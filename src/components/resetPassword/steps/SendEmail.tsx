import { Button } from '@/components/Button'
import type { StepProps } from './FindUser'
import Alert from '@/icons/Alert'
import type { FindUserUser, SendPasswordResetCodeResponse } from '@/types/api'
import { useCallback, useEffect, useState } from 'react'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { getStringTime } from '@/utils/dom'

interface StepSendEmailProps extends Omit<StepProps, 'onComplete'> {
	user: FindUserUser | null
	onComplete: (dateNewCode: Date) => void
}

export function SendEmail({ onComplete, onCancel, user }: StepSendEmailProps) {
	const [sendingEmail, setSendingEmail] = useState(false)
	const [dateNewCode, setDateNewCode] = useState<Date | null>(null)
	const [seconds, setSeconds] = useState(0)

	const handleSendEmail = useCallback(async () => {
		if (seconds > 0) {
			return snackbar({
				message: `Esperando para enviar correo (${getStringTime(seconds)})`,
				variant: 'warning'
			})
		}

		if (sendingEmail || !user)
			return snackbar({ message: 'Enviando correo', variant: 'warning', })

		setSendingEmail(true)
		const data = await doFetch<SendPasswordResetCodeResponse>({
			url: '/user/send-password-reset-code',
			method: 'POST',
			body: { userId: user.id }
		})

		if (!data.ok) {
			snackbar({ message: data.message, variant: 'error' })

			// mostrar el tiempo restante
			if ('timeNewCode' in data && data.timeNewCode) {
				setDateNewCode(new Date(data.timeNewCode))
			}

			return
		}

		setSendingEmail(false)
		onComplete(new Date(data.timeNewCode))
	}, [onComplete, sendingEmail, user, seconds])

	useEffect(() => {
		if (!dateNewCode) return
		setSeconds(Math.floor((dateNewCode.getTime() - Date.now()) / 1000))

		const interval = setInterval(() => {
			if (seconds <= 0) {
				setSeconds(0)
				clearInterval(interval)
				return
			}

			setSeconds((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [dateNewCode, seconds])

	return (
		<div>
			<div className="border border-blue-300 bg-blue-100 p-2 rounded dark:bg-blue-400/40 dark:border-blue-500/40">
				<p className="text-xs md:text-sm text-pretty text-center [&_svg]:size-4 [&_svg]:inline-block [&_svg]:mr-1">
					<Alert />
					Se enviará un mensaje al correo <strong>{user?.email}</strong> con un
					código para restablecer su contraseña.
				</p>
			</div>

			<div className="flex gap-2 mt-5">
				<Button primary={false} onClick={onCancel} showLoader={false}>
					Cambiar usuario
				</Button>
				<Button
					type="button"
					showLoader
					onClick={handleSendEmail}
					disabled={seconds > 0}
				>
					{seconds > 0 ? getStringTime(seconds) : 'Enviar correo'}
				</Button>
			</div>
		</div>
	)
}
