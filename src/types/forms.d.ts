export type ValidateFieldsProps = HTMLFormControlsCollection & {
	[key: string]: HTMLInputElement | HTMLSelectElement
}
export type ValidateFieldsReturnType = Record<string, string>

export type FormErrors<T> = {
	[K in keyof T]?: string | null
}

export type FormElements<T extends Record<string, unknown>> = T &
	HTMLFormControlsCollection

export type Form<T extends Record<string, unknown>> = HTMLFormElement & {
	elements: FormElements<T>
}

export interface LoginFormElements extends HTMLFormControlsCollection {
	typeDocumentCode: HTMLSelectElement
	document: HTMLInputElement
	password: HTMLInputElement
	remember: HTMLInputElement
}

export interface LoginErrors {
	typeDocumentCode?: string | null
	document?: string | null
	password?: string | null
	remember?: string | null
}

export interface RegisterFormElements extends HTMLFormControlsCollection {
	name: HTMLInputElement
	lastname: HTMLInputElement
	typeDocumentCode: HTMLSelectElement
	document: HTMLInputElement
	phone: HTMLInputElement
	email: HTMLInputElement
	password: HTMLInputElement
	confirmPassword: HTMLInputElement
}

export interface RegisterErrors {
	name?: string | null
	lastname?: string | null
	typeDocumentCode?: string | null
	document?: string | null
	phone?: string | null
	email?: string | null
	password?: string | null
	confirmPassword?: string | null
}

export interface UpdateProfileFormElements extends HTMLFormControlsCollection {
	name: HTMLInputElement
	lastname: HTMLInputElement
	phone: HTMLInputElement
	email: HTMLInputElement
	image: HTMLInputElement
}

export interface UpdateProfileErrors {
	name: string | null
	lastname: string | null
	phone: string | null
	email: string | null
}

export interface FindUserFormElements extends HTMLFormControlsCollection {
	typeDocumentCode: HTMLSelectElement
	document: HTMLInputElement
}

export interface FindUserErrors {
	typeDocumentCode: string | null
	document: string | null
}

export interface WriteCodeFormElements extends HTMLFormControlsCollection {
	code: HTMLInputElement
}

export interface WriteCodeErrors {
	code: string | null
}

export interface WritePasswordElements extends HTMLFormControlsCollection {
	password: HTMLInputElement
	passwordConfirmation: HTMLInputElement
}

export interface WritePasswordErrors {
	password: string | null
	passwordConfirmation: string | null
}
