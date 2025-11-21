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