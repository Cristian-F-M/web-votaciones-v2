import {
	SELECT_DEFAULT_VALUE,
	INPUTS_VALIDATIONS as IV,
	PASSWORD_REGEX,
	PASSWORD_MIN_MAX_LENGHT
} from '@/constants/form'
import * as z from 'zod'

export const SCHEMES = {
	typeDocument: z
		.string()
		.nonempty(IV.requiredMessage)
		.refine((v) => v !== SELECT_DEFAULT_VALUE, IV.select.requiredMessage),
	document: z
		.string()
		.nonempty(IV.requiredMessage)
		.min(IV.document.min, IV.document.sizeMessage)
		.max(IV.document.max, IV.document.sizeMessage),
	password: z
		.string()
		.nonempty(IV.requiredMessage)
		.min(PASSWORD_MIN_MAX_LENGHT[0], IV.password.sizeMessage)
		.max(PASSWORD_MIN_MAX_LENGHT[1], IV.password.sizeMessage),
	name: z
		.string()
		.nonempty(IV.requiredMessage)
		.min(IV.name.min, IV.name.sizeMessage),
	lastname: z
		.string()
		.nonempty(IV.requiredMessage)
		.min(IV.lastname.min, IV.lastname.sizeMessage),
	phone: z
		.string()
		.nonempty(IV.requiredMessage)
		.length(IV.phone.size, IV.phone.sizeMessage),
	email: z.email(IV.email.validMessage)
}

export const LOGIN_SCHEME = z.object({
	typeDocumentCode: SCHEMES.typeDocument,
	document: SCHEMES.document,
	password: SCHEMES.password
})

export const REGISTER_SCHEME = z
	.object({
		typeDocumentCode: SCHEMES.typeDocument,
		document: SCHEMES.document,
		name: SCHEMES.name,
		lastname: SCHEMES.lastname,
		phone: SCHEMES.phone,
		email: SCHEMES.email,
		password: SCHEMES.password.regex(PASSWORD_REGEX, IV.password.strongMessage),
		confirmPassword: SCHEMES.password
	})
	.refine((d) => d.password === d.confirmPassword, {
		error: IV.password.confirmMessage,
		path: ['confirmPassword']
	})

  export const UPDATE_PROFILE_SCHEME = z.object({
    name: SCHEMES.name,
    lastname: SCHEMES.lastname,
    phone: SCHEMES.phone,
    email: SCHEMES.email,
  })