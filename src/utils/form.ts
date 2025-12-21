import { EMAIL_REGEX, PASSWORD_REGEX, INDEX_REGEX } from '@/constants/form'
import type { FormErrors, ProcessedErrors } from '@/types/api'
import type {
	ValidateFieldsProps,
	ValidateFieldsReturnType
} from '@/types/forms'
import type { ZodErrors } from '@/types/zod'
import { z } from 'zod'
import type { ZodSafeParseResult, ZodType } from 'zod'

export const isEmailValid = (email: string) => EMAIL_REGEX.test(email)
export const isPasswordValid = (text: string) => PASSWORD_REGEX.test(text)

export function getErrorEntries(errors: Record<string, any>) {
	return Object.entries(errors).filter(([_, value]) => value)
}

export function getProcessedErrors(errors: FormErrors): ProcessedErrors {
	const locallyErrors = Object.entries(errors).map(
		([_, [{ path, message }]]) => [path, message]
	)
	return Object.fromEntries(locallyErrors)
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
) {
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
		const isArray = /\[\]/g.test(rawKey)
		const paths = rawKey
			.replace(/\]/g, '')
			.split('[')
			.slice(0, isArray ? 1 : undefined)
		const isObject = /\[.+\]/g.test(rawKey)

		set(result, paths, value, isArray)
	}

	return result as R
}

export function set(
	obj: Record<string, any>,
	paths: string[],
	value: unknown,
	isArray = false
) {
	let currentObj = obj

	for (const [index, key] of Array.from(paths.entries())) {
		const isLast = index === paths.length - 1
		const isIndex = INDEX_REGEX.test(key)
		const nextKey = paths[index + 1]
		const nextKeyIsIndex = INDEX_REGEX.test(nextKey)

		if (isArray) {
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			;(currentObj[key] ??= []).push(value)
			continue
		}

		if (isLast) {
			currentObj[key] = value
			continue
		}

		if (!currentObj[key]) currentObj[key] = nextKeyIsIndex ? [] : {}
		currentObj = currentObj[key]
	}
}

export function getValidationResult(errors: ZodErrors) {
	const result: ProcessedErrors = {}

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

export function validateForm(
	form: HTMLFormElement | HTMLFormControlsCollection | ProcessedErrors,
	schema: ZodType
) {
	let serializedForm: ProcessedErrors = {}

	const isForm = form instanceof HTMLFormElement
	const areFormElementos = form instanceof HTMLFormControlsCollection

	if (isForm) serializedForm = serializeForm(form.elements)
	if (areFormElementos) serializedForm = serializeForm(form)
	if (!areFormElementos && !isForm) serializedForm = form

	const result = z.safeParse(schema, serializedForm)
	const errors = result.success ? undefined : parseZodMessages(result)

	return { success: result.success, errors }
}
