'use client'
import { Button } from '@/components/Button'
import Alert from '@/icons/Alert'
import type {
	PasswordResetGetDataResponse,
	PasswordResetSendCodeResponse
} from '@/types/api'
import { snackbar, getStringTime } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
	useResetPasswordData,
	ResetPasswordStep,
	useResetPasswordStep
} from '@/app/(auth)/reset-password/layout'

export function SendEmailPage() {
	const [sendingEmail, setSendingEmail] = useState(false)
	const [nextSendAt, setNextSendAt] = useState<Date | null>(null)
	const [seconds, setSeconds] = useState(0)
	const [user, setUser] = useState<{ email: string } | null>(null)
	const searchParams = useSearchParams()
	const token = searchParams.get('token') as string
	const router = useRouter()
	const { setStep } = useResetPasswordStep()

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
		const response = await doFetch<PasswordResetSendCodeResponse>({
			url: '/reset-password/send-code',
			method: 'POST',
			body: { token }
		})

		setSendingEmail(false)

		if (!response.ok) {
			snackbar({ message: response.message, variant: 'error' })

			// mostrar el tiempo restante
			if ('nextSendAt' in response && response.nextSendAt) {
				setNextSendAt(new Date(response.nextSendAt))
			}

			return
		}

		router.push(response.urlRedirect)
		snackbar({ message: response.message, variant: 'success' })
	}, [sendingEmail, user, seconds, token, router])

	const handleChangeUser = useCallback(() => {}, [])

	useEffect(() => {
		if (!nextSendAt) return
		setSeconds(Math.floor((nextSendAt.getTime() - Date.now()) / 1000))

		const interval = setInterval(() => {
			if (seconds <= 0) {
				setSeconds(0)
				clearInterval(interval)
				return
			}

			setSeconds((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [nextSendAt, seconds])

	useEffect(() => {
		useResetPasswordData<PasswordResetGetDataResponse>(token).then(
			(response) => {
				if (!response.ok) return

				setUser({ email: response.data.email })
				if (response.data.nextSendAt)
					setNextSendAt(new Date(response.data.nextSendAt))

				setStep(ResetPasswordStep.SEND_EMAIL)
			}
		)
	}, [token, setStep])

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
				<Button primary={false} onClick={handleChangeUser} showLoader={false}>
					Cambiar usuario
				</Button>
				<Button
					type="button"
					showLoader
					onClick={handleSendEmail}
					disabled={seconds > 0 || sendingEmail}
					loading={sendingEmail}
				>
					{seconds > 0 ? getStringTime(seconds) : 'Enviar correo'}
				</Button>
			</div>
		</div>
	)
}
