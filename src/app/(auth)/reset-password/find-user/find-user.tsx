'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import type {
	TypeDocumentGetAllResponse,
	PasswordResetFindUserResponse
} from '@/types/api'
import type {
	FindUserErrors,
	FindUserForm,
	FindUserFormElements,
	FindUserFormValues
} from '@/types/forms'
import type { SelectItem } from '@/types/input'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { getProcessedErrors, serializeForm, validateForm } from '@/utils/form'
import { FIND_USER_SCHEME } from '@/zod-validations'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
	useResetPasswordStep,
	ResetPasswordStep
} from '@/app/(auth)/reset-password/layout'

export function FindUserPage() {
	const [typesDocuments, setTypesDocuments] = useState<SelectItem[]>([])
	const [findingUser, setFindingUser] = useState(false)
	const [errors, setErrors] = useState<Partial<FindUserErrors>>({})
	const router = useRouter()
	const { setStep } = useResetPasswordStep()

	const handleFindUser = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const form = event.currentTarget as FindUserForm

			const result = validateForm(form, FIND_USER_SCHEME)

			if (!result.success) {
				setErrors((prev) => ({ ...prev, ...result.errors }))
				return
			}

			const serializedForm = serializeForm<FindUserFormValues>(form.elements)

			setFindingUser(true)

			const response = await doFetch<PasswordResetFindUserResponse>({
				url: '/reset-password/find-user',
				method: 'POST',
				body: serializedForm
			})

			setFindingUser(false)

			if (!response.ok) {
				snackbar({ message: response.message, variant: 'error' })

				if ('urlRedirect' in response) return router.push(response.urlRedirect)

				if (response.errors) {
					const errors = getProcessedErrors(response.errors)
					setErrors(errors)
				}

				return
			}

			router.push(response.urlRedirect)
		},
		[router]
	)

	const clearError = useCallback((key: keyof FindUserFormElements) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	useEffect(() => {
		const fetchTypesDocuments = async () => {
			const data = await doFetch<TypeDocumentGetAllResponse>({
				url: '/typeDocument/all'
			})

			if (!data.ok) return snackbar({ message: data.message, variant: 'error' })

			const typesDocumentsItems: SelectItem[] = data.data.map(
				({ id, name, code }) => ({ id, name, value: code })
			)

			setTypesDocuments(typesDocumentsItems)
		}
		fetchTypesDocuments()
	}, [])

	useEffect(() => {
		setStep(ResetPasswordStep.FIND_USER)
	}, [setStep])

	return (
		<>
			<link rel="stylesheet" href="/assets/css/form-ntw.css" />
			<form className="space-y-9" onSubmit={handleFindUser}>
				<Select
					items={typesDocuments}
					label="Tipo de documento"
					name="typeDocumentCode"
					id="type-document-code"
					error={errors.typeDocumentCode}
					onChange={() => clearError('typeDocumentCode')}
				/>
				<Input
					type="number"
					label="Número de documento"
					name="document"
					id="document"
					error={errors.document}
					onChange={() => clearError('document')}
				/>
				<Button loading={findingUser} showLoader>
					Buscar usuario
				</Button>
			</form>
		</>
	)
}
