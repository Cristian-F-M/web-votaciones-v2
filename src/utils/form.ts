import type { ApiErrors, GetProcessedErrorsReturnType } from '@/types/api'
import type {
	ValidateFieldsProps,
	ValidateFieldsReturnType
} from '@/types/forms'

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const isEmailValid = (email: string) => EMAIL_REGEX.test(email)

export function getErrorEntries(errors: Record<string, any>) {
	return Object.entries(errors).filter(([_, value]) => value)
}

export function getProcessedErrors(
	errors: ApiErrors
): GetProcessedErrorsReturnType {
	const errorsEntries = Object.entries(errors)
	const locallyErrors: GetProcessedErrorsReturnType = {}

	for (const [_, error] of errorsEntries) {
		const { path, msg } = error[0]
		locallyErrors[path] = msg
	}
	return locallyErrors
}

export function validateFieldsNotEmpty(
	fields: ValidateFieldsProps
): ValidateFieldsReturnType {
	const errors: { [key: string]: string } = {}

	for (const key in fields) {
		if (['namedItem', 'length', 'item'].includes(key)) continue
		if (!Number.isNaN(Number(key))) continue
		const field = fields[key]
		const name = field.name || key

		if (!field.value || field.value.trim() === '') {
			errors[name] = 'Este campo es obligatorio'
		}

		if (field instanceof HTMLSelectElement) {
			if (field.value === 'default-value') {
				errors[name] = 'Seleccione un campo de la lista'
			}
		}
	}

	return errors
}
