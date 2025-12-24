import { ItemsList } from '@/components/item-list/ItemsList'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button'
import { doFetch } from '@/utils/fetch'
import type { Item } from '@/types/ItemList'
import {
	getProcessedErrors,
	parseZodMessages,
	serializeForm
} from '@/utils/form'
import { UPDATE_CANDIDATE_PROFILE_SCHEME } from '@/zod-validations'
import * as z from 'zod'
import { TextArea } from '../TextArea'
import { snackbar } from '@/utils/dom'
import type { CandidateUpdateProfileResponse } from '@/types/api'
import { INPUTS_VALIDATIONS as IV } from '@/constants/form'
import { useCandidate } from '@/states/useCandidate'

export function Profile() {
	const [errors, setErrors] = useState<
		Partial<{ description: string; objectives: string }>
	>({})
	const [updatingProfile, setUpdatingProfile] = useState(false)
	const { candidate } = useCandidate()

	const handleSubmit = useCallback(
		async (event: React.SyntheticEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (updatingProfile)
				return snackbar({ message: 'Cargando...', variant: 'info' })

			const serializedForm = serializeForm(event.currentTarget)

			const result = z.safeParse(
				UPDATE_CANDIDATE_PROFILE_SCHEME,
				serializedForm
			)

			if (!result.success) {
				const errors = parseZodMessages(result)
				setErrors(errors)
				return
			}

			const formData = new FormData(event.currentTarget)
			setUpdatingProfile(true)

			const response = await doFetch<CandidateUpdateProfileResponse>({
				url: '/candidate/profile',
				method: 'PUT',
				body: serializedForm
			})

			setUpdatingProfile(false)

			const messageVariant = response.ok ? 'success' : 'error'
			snackbar({ message: response.message, variant: messageVariant })

			if (!response.ok) {
				if (response.errors) {
					const errors = getProcessedErrors(response.errors)
					setErrors(errors)
				}

				return
			}
		},
		[updatingProfile]
	)

	const clearError = (field: string) => {
		setErrors((prev) => ({
			...prev,
			[field]: undefined
		}))
	}

  useEffect(() => {
    console.log(candidate)
  }, [candidate])

	return (
		<div>
			<header className="w-full">
				<h2 className="text-xl font-semibold">Información de Candidatura</h2>
				<p className="text-sm text-gray-500">
					Cuéntanos tus objetivos y describe tu experiencia
				</p>
			</header>

			<main className="mt-6">
				<form className="space-y-6 [&_h5]:text-sm" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<h5>Descripción</h5>
						<TextArea
							use="form"
							name="description"
							id="description"
							error={errors.description}
							onChange={() => {
								clearError('description')
							}}
							placeholder="Hola, soy ......... tengo ... años estudiante de..."
							limit={IV.description.max}
							defaultValue={candidate?.description}
						/>
					</div>

					<div className="space-y-4">
						<h5>Objetivos</h5>
						<ItemsList
							use="form"
							label="Agregar un nuevo objetivo"
							error={errors.objectives}
							onChange={() => {
								clearError('objectives')
							}}
							defaultItems={candidate?.objectives as any as Item[] ?? []}
							name="objectives"
							textKey="text"
						/>
					</div>

					<Button
						showLoader={true}
						disabled={updatingProfile}
						loading={updatingProfile}
						type="submit"
					>
						Guardar
					</Button>
				</form>
			</main>
		</div>
	)
}
