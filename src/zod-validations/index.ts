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
		passwordConfirmation: SCHEMES.password
	})
	.refine((d) => d.password === d.passwordConfirmation, {
		error: IV.password.confirmMessage,
		path: ['passwordConfirmation']
	})

export const UPDATE_PROFILE_SCHEME = z.object({
	name: SCHEMES.name,
	lastname: SCHEMES.lastname,
	phone: SCHEMES.phone,
	email: SCHEMES.email
})

export const OBJECTIVE_SCHEME = z.object({
	id: z.string().nonempty(IV.requiredMessage),
	text: z.string().nonempty(IV.requiredMessage).min(IV.objectives.text.min, IV.objectives.text.sizeMessage)
})

export const UPDATE_CANDIDATE_PROFILE_SCHEME = z.object({
	description: z
		.string()
		.nonempty(IV.requiredMessage)
		.min(IV.description.min, IV.description.sizeMessage)
		.max(IV.description.max, IV.description.sizeMessage),
	objectives: z
		.array(OBJECTIVE_SCHEME, IV.objectives.sizeMessage)
		.min(IV.objectives.min, IV.objectives.sizeMessage)
		.max(IV.objectives.max, IV.objectives.sizeMessage)
})

export const FIND_USER_SCHEME = z.object({
	typeDocumentCode: SCHEMES.typeDocument,
	document: SCHEMES.document
})

export const WRITE_CODE_SCHEME = z.object({
	code: z.string().nonempty(IV.requiredMessage)
})

export const UPDATE_PASSWORD_SCHEME = z
	.object({
		password: SCHEMES.password.regex(PASSWORD_REGEX, IV.password.strongMessage),
		passwordConfirmation: SCHEMES.password
	})
	.refine((d) => d.password === d.passwordConfirmation, {
		error: IV.password.confirmMessage,
		path: ['passwordConfirmation']
	})
