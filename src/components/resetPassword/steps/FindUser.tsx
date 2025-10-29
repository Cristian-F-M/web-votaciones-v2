import { Select } from '@/components/Select'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useCallback, useEffect, useState } from 'react'
import { doFetch } from '@/utils/fetch'
import type {
	FindUserResponse,
	FindUserUser,
	GetTypeDocumentsResponse
} from '@/types/api'
import type { TypeDocument } from '@/types/models'
import { snackbar } from '@/utils/dom'
import type { FindUserErrors, FindUserFormElements } from '@/types/forms'
import { getErrorEntries, getProcessedErrors } from '@/utils/form'

export type OnComplete = () => void
export type OnCancel = () => void

export interface StepProps {
	onComplete: OnComplete
	onCancel?: OnCancel
}

export interface StepFindUserProps {
	onComplete: (user: FindUserUser) => void
	onCancel?: OnCancel
}

export function FindUser({ onComplete }: StepFindUserProps) {
	const [typesDocuments, setTypesDocuments] = useState<TypeDocument[]>([])
	const [findingUser, setFindingUser] = useState(false)
	const [errors, setErrors] = useState<Partial<FindUserErrors>>({})

	useEffect(() => {
		const fetchTypesDocuments = async () => {
			const data = await doFetch<GetTypeDocumentsResponse>({
				url: '/typeDocument'
			})

			if (!data.ok) return snackbar({ message: data.message, variant: 'error' })

			setTypesDocuments(data.typesDocuments)
		}
		fetchTypesDocuments()
	}, [])

	const handleFindUser = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const form = event.currentTarget as HTMLFormElement

			const { typeDocumentCode, document } =
				form.elements as FindUserFormElements

			const locallyErrors: Partial<FindUserErrors> = {}

			if (typeDocumentCode.value === 'default-value') {
				locallyErrors.typeDocumentCode = 'El tipo de documento es obligatorio'
			}

			if (!document.value) {
				locallyErrors.document = 'El número de documento es obligatorio'
			}

			setErrors((prev) => ({ ...prev, ...locallyErrors }))

			const locallyErrorEntries = getErrorEntries(locallyErrors)
			const errorsEntries = getErrorEntries(errors)

			if (locallyErrorEntries.length > 0 || errorsEntries.length > 0) return

			setFindingUser(true)

			const data = await doFetch<FindUserResponse>({
				url: '/user/find-user',
				method: 'POST',
				body: {
					typeDocumentCode: typeDocumentCode.value,
					document: document.value
				}
			})

			setFindingUser(false)

			if (!data.ok) {
				if ('message' in data) snackbar({ message: data.message, variant: 'error', })

				if ('errors' in data) {
					const errors = getProcessedErrors(data.errors)
					setErrors(errors)
				}

				return
			}

			onComplete(data.user)
		},
		[onComplete, errors]
	)

	const clearError = useCallback((key: keyof FindUserFormElements) => {
		setErrors((prev) => ({ ...prev, [key]: null }))
	}, [])

	return (
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
	)
}
