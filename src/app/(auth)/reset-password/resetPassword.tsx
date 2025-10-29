'use client'
import { ToggleTheme } from '@/components/ToggleTheme'
import LogoSena from '@/icons/LogoSena'
import { useState } from 'react'
import ArrowLeft from '@/icons/ArrowLeft'
import { FindUser as StepFindUser } from '@/components/resetPassword/steps/FindUser'
import { SendEmail as StepSendEmail } from '@/components/resetPassword/steps/SendEmail'
import { WriteCode as StepWriteCode } from '@/components/resetPassword/steps/WriteCode'
import { StepIndicator } from '@/components/resetPassword/StepIndicator'
import { WritePassword as StepWritePassword } from '@/components/resetPassword/steps/WritePassword'
import type { FindUserUser } from '@/types/api'

enum ResetPasswordStep {
	FIND_USER,
	SEND_EMAIL,
	WRITE_CODE,
	WRITE_PASSWORD
}

export function ResetPasswordPage() {
	const [resetPasswordStep, setResetPasswordStep] = useState<ResetPasswordStep>(
		ResetPasswordStep.FIND_USER
	)
	const [user, setUser] = useState<FindUserUser | null>(null)
	const [dateNewCode, setDateNewCode] = useState<Date | null>(null)
	const [code, setCode] = useState<string | null>(null)

	const steps = ['Usuario', 'Correo', 'Código', 'Contraseña']

	const nextStep = () => {
		setResetPasswordStep((prevStep) => {
			const next = prevStep + 1
			const steps = Object.keys(ResetPasswordStep).length / 2
			return next < steps ? next : prevStep
		})
	}

	const prevStep = () => {
		setResetPasswordStep((prevStep) => {
			const prev = prevStep - 1
			return prev >= 0 ? prev : prevStep
		})
	}

	return (
		<>
			<link rel="stylesheet" href="/assets/css/form-ntw.css" />
			<div className="w-screen h-screen flex items-center justify-center">
				<div className="absolute top-2 right-2">
					<ToggleTheme />
				</div>
				<div className="border border-gray-300 w-11/12 max-w-[500px] h-auto md:h-11/12 rounded shadow-lg dark:bg-gray-800 dark:border-gray-700">
					<a
						className="flex items-center [&_svg]:size-4.5 text-gray-600 text-xs m-1.5 w-fit py-1.5 px-2 rounded hover:bg-gray-200/60 transition-colors dark:text-gray-400 dark:hover:bg-gray-700"
						href="/login"
					>
						<ArrowLeft />
						Volver al login
					</a>
					<header className="flex flex-col items-center justify-center [&_svg]:size-30 [&_svg]:text-(--color) mt-4">
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
							<StepIndicator currentStep={resetPasswordStep} steps={steps} />
						</div>

						{resetPasswordStep === ResetPasswordStep.FIND_USER && (
							<StepFindUser
								onComplete={(user: FindUserUser) => {
									setUser(user)
									nextStep()
								}}
							/>
						)}
						{resetPasswordStep === ResetPasswordStep.SEND_EMAIL && (
							<StepSendEmail
								onComplete={(dateNewCode: Date) => {
									setDateNewCode(dateNewCode)
									nextStep()
								}}
								onCancel={() => {
									prevStep()
									setUser(null)
								}}
								user={user}
							/>
						)}
						{resetPasswordStep === ResetPasswordStep.WRITE_CODE && (
							<StepWriteCode
								onComplete={(code: string) => {
									setCode(code)
									nextStep()
								}}
								user={user}
								dateNewCode={dateNewCode}
							/>
						)}
						{resetPasswordStep === ResetPasswordStep.WRITE_PASSWORD && (
							<StepWritePassword code={code} user={user} />
						)}
					</main>
				</div>
			</div>
		</>
	)
}
