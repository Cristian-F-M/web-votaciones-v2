import type { LoginErrors, RegisterErrors } from './forms'
import type { SelectItem } from './input'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type GetProcessedErrorsReturnType = Record<string, string | null | undefined>

export interface FetchProps {
	url: `/${string}`
	method?: HttpMethod
	body?: FormData | Record<string, any> | string | null
	headers?: HeadersInit
	cache?: RequestInit['cache']
}

export type FetchSuccess<T> = {
	ok: true
}

export type FetchError = {
	ok: false
	message: string
}

export interface TypeDocument {
	id: string
	value: string
	name: string
	code: string
	description: string
}

export interface Role {
	id: string
	value: string
	name: string
	code: string
	description: string
}

export interface GetTypeDocumentsResponse {
	ok: boolean
	message?: string
	typesDocuments: TypeDocument[]
}

export interface LoginSuccesResponse {
	ok: true
	message: string
	urlRedirect: string
	token?: string
}

export interface FieldError {
	type: string
	msg: string
	path: string
	location: string
  message?: string
}

export interface Errors<T> {
	[key: keyof T]: FieldError[]
}

export interface ApiErrors {
	[key: string]: FieldError[]
}

export interface LoginFailedResponse {
	ok: false
	message: string
	errors: ApiErrors
}

export type LoginResponse = LoginSuccesResponse | LoginFailedResponse

export interface VerifySessionResponse {
	ok: boolean
	message: string
	urlRedirect: string
}

export interface ResponseSuccesResponse {
	ok: true
	message: string
	urlRedirect: string
}

export interface ResponseFailedResponse {
	ok: false
	message: string
	errors?: ApiErrors
}

export type RegisterResponse = ResponseSuccesResponse | ResponseFailedResponse
