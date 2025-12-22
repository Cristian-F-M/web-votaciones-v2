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

// Login
interface LoginFormValues {
	typeDocumentCode: string
	document: string
	password: string
	remember: string
}

export interface LoginFormElements extends HTMLFormControlsCollection {
	typeDocumentCode: HTMLSelectElement
	document: HTMLInputElement
	password: HTMLInputElement
	remember: HTMLInputElement
}

export interface LoginForm extends Form<LoginFormElements> {}
export interface LoginErrors extends FormErrors<LoginFormValues> {}

// Register

export interface RegisterFormValues {
	name: string
	lastname: string
	typeDocumentCode: string
	document: string
	phone: string
	email: string
	password: string
	passwordConfirmation: string
}

export interface RegisterFormElements extends HTMLFormControlsCollection {
	name: HTMLInputElement
	lastname: HTMLInputElement
	typeDocumentCode: HTMLSelectElement
	document: HTMLInputElement
	phone: HTMLInputElement
	email: HTMLInputElement
	password: HTMLInputElement
	passwordConfirmation: HTMLInputElement
}

export interface RegisterForm extends Form<RegisterFormElements> {}
export interface RegisterErrors extends FormErrors<RegisterFormValues> {}

// Update profile
interface UpdateProfileFormValues {
	name: string
	lastname: string
	phone: string
	email: string
	image: string
}

export interface UpdateProfileFormElements extends HTMLFormControlsCollection {
	name: HTMLInputElement
	lastname: HTMLInputElement
	phone: HTMLInputElement
	email: HTMLInputElement
	image: HTMLInputElement
}

export interface UpdateProfileErrors
	extends FormErrors<UpdateProfileFormValues> {}
export interface UpdateProfileForm extends Form<UpdateProfileFormElements> {}

// Find user
interface FindUserFormValues {
	typeDocumentCode: string
	document: string
}

export interface FindUserFormElements extends HTMLFormControlsCollection {
	typeDocumentCode: HTMLSelectElement
	document: HTMLInputElement
}

export interface FindUserErrors extends FormErrors<FindUserFormValues> {}
export interface FindUserForm extends Form<FindUserFormElements> {}

// Write code
interface WriteCodeFormValues {
	code: string
}

export interface WriteCodeFormElements extends HTMLFormControlsCollection {
	code: HTMLInputElement
}

export interface WriteCodeErrors extends FormErrors<WriteCodeFormValues> {}
export interface WriteCodeForm extends Form<WriteCodeFormElements> {}

// Write password
interface WritePasswordFormValues {
	password: string
	passwordConfirmation: string
}

export type WritePasswordErrors = FormErrors<WritePasswordFormValues>
export interface WritePasswordForm extends Form<WritePasswordFormElements> {}
