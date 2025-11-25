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
		.max(PASSWORD_MIN_MAX_LENGHT[1], IV.password.sizeMessage)
}

export const LOGIN_SCHEME = z.object({
	typeDocumentCode: SCHEMES.typeDocument,
	document: SCHEMES.document,
	password: SCHEMES.password
})

