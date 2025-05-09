export type ValidateFieldsProps = HTMLFormControlsCollection & {
	[key: string]: HTMLInputElement | HTMLSelectElement
}
export type ValidateFieldsReturnType = Record<string, string>

export interface LoginFormElements extends HTMLFormControlsCollection {
	typeDocument: HTMLInputElement
	document: HTMLInputElement
	password: HTMLInputElement
	remember: HTMLInputElement
}

export interface LoginErrors {
	typeDocument?: string | null
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
