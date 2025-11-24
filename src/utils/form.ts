import type { ApiErrors, GetProcessedErrorsReturnType } from '@/types/api'
import type {
	ValidateFieldsProps,
	ValidateFieldsReturnType
} from '@/types/forms'

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD_REGEX =
	/^(?=(.*[A-Z]))(?=(.*[a-z]))(?=(.*\d))(?=(.*[\W_]))[A-Za-z\d\W_]{8,20}$/

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

export function serializeForm<T extends HTMLFormControlsCollection>(
	form: HTMLFormElement | T
) {
	if (form instanceof HTMLFormElement) {
		const formData = new FormData(form)
		const formEntries = formData.entries()
		return Object.fromEntries(formEntries) as T | Record<string, any>
	}


  if (form instanceof HTMLFormControlsCollection) {
    const entries = Array.from(form).map((e) => {
      if (e instanceof HTMLInputElement || e instanceof HTMLSelectElement) {
        return [e.name, e.value]
      }
    }).filter(c => !!c)
    return Object.fromEntries(entries)
  }
}
