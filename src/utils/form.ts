import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/form'
import type { ApiErrors, GetProcessedErrorsReturnType } from '@/types/api'
import type {
	ValidateFieldsProps,
	ValidateFieldsReturnType
} from '@/types/forms'
import type { ZodErrors } from '@/types/zod'
import type { ZodSafeParseResult } from 'zod'

export const isEmailValid = (email: string) => EMAIL_REGEX.test(email)
export const isPasswordValid = (text: string) => PASSWORD_REGEX.test(text)

export function getErrorEntries(errors: Record<string, any>) {
	return Object.entries(errors).filter(([_, value]) => value)
}

export function getProcessedErrors(
	errors: ApiErrors
): GetProcessedErrorsReturnType {
	const errorsEntries = Object.entries(errors)
	const locallyErrors: GetProcessedErrorsReturnType = {}

	for (const [_, error] of errorsEntries) {
		const { path, msg, message } = error[0]
		locallyErrors[path] = msg || message
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

export function serializeForm<R = Record<string, unknown>>(
	form: HTMLFormElement | HTMLFormControlsCollection
): R {
	let entries: [string, FormDataEntryValue][] = []

	if (form instanceof HTMLFormElement) {
		entries = Array.from(new FormData(form).entries())
	}

	if (form instanceof HTMLFormControlsCollection) {
		entries = (
			Array.from(form) as (HTMLElement & { name: string; value: string })[]
		).map((el) => [el.name, el.value] as [string, FormDataEntryValue])
	}

	const result: Record<string, any> = {}

	for (const [rawKey, value] of entries) {
		const isArray = rawKey.endsWith('[]')
		const key = isArray ? rawKey.replace('[]', '') : rawKey

		if (isArray) {
			const arr = result[key] || []
			arr.push(value)
			result[key] = arr
			continue
		}

		result[key] = value
	}

	return result as R
}

export function getValidationResult(errors: ZodErrors) {
	const result: GetProcessedErrorsReturnType = {}

	for (const i of errors) {
		const path = i.path[0]
		if (Object.hasOwn(result, path)) continue
		result[path] = i.message
	}

	return result
}

export function parseZodMessages(result: ZodSafeParseResult<any>) {
	if (result.success) return {}

	const zodErrors = result.error
	const messages = JSON.parse(zodErrors.message) as ZodErrors

	return getValidationResult(messages)
}
