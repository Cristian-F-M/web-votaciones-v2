'use client'
import { StepIndicator } from '@/components/resetPassword/StepIndicator'
import { ToggleTheme } from '@/components/ToggleTheme'
import ArrowLeft from '@/icons/ArrowLeft'
import LogoSena from '@/icons/LogoSena'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { useCallback } from 'react'
import { create } from 'zustand'
import { useRouter, redirect } from 'next/navigation'

export enum ResetPasswordStep {
	FIND_USER,
	SEND_EMAIL,
	WRITE_CODE,
	UPDATE_PASSWORD
}

interface ResetPasswordStepState {
	step: ResetPasswordStep
	setStep: (step: ResetPasswordStep) => void
}

export const useResetPasswordStep = create<ResetPasswordStepState>()((set) => ({
	step: ResetPasswordStep.FIND_USER,
	setStep: (step) => set({ step })
}))

export async function useResetPasswordData<T>(token: string) {
	const response = await doFetch<{
		ok: boolean
		message?: string
		urlRedirect?: string
	}>({
		url: `/reset-password?token=${token}`,
		method: 'GET'
	})

	const snackbarVariant = response.ok ? 'success' : 'error'
	snackbar({ message: response.message, variant: snackbarVariant })

	if ('urlRedirect' in response && response.urlRedirect)
		redirect(response.urlRedirect)

	return response as T
}

export default function ResetPasswordLayout({
	children
}: {
	children: React.ReactNode
}) {
	const steps = ['Usuario', 'Correo', 'Código', 'Contraseña']
	const { step, setStep } = useResetPasswordStep()

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="absolute top-2 right-2">
				<ToggleTheme />
			</div>
			<div className="border border-gray-300 w-11/12 max-w-[500px] rounded shadow-lg dark:bg-gray-800 dark:border-gray-700 min-h-[550px] h-fit">
				<a
					className="flex items-center [&_svg]:size-4.5 text-gray-600 text-xs m-1.5 w-fit py-1.5 px-2 rounded hover:bg-gray-200/60 transition-colors dark:text-gray-400 dark:hover:bg-gray-700"
					href="/login"
				>
					<ArrowLeft />
					Volver al login
				</a>
				<header className="flex flex-col items-center justify-center [&_svg]:size-30 [&_svg]:text-primary mt-4">
					<LogoSena />
					<h1 className="text-2xl font-semibold mt-2">
						Restablecer contraseña
					</h1>
					<span className="text-sm text-gray-500 text-center">
						Ingresa tu información para restablecer su contraseña
					</span>
				</header>

				<main className="flex flex-col gap-8 px-8 py-8">
					<div className="w-full md:w-11/12 mx-auto">
						<StepIndicator currentStep={step} steps={steps} />
					</div>

					{children}
				</main>
			</div>
		</div>
	)
}
