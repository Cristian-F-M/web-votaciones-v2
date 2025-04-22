import type { SelectItem } from './input'

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

export interface LoginResponse {
	ok: boolean
	message: string
	urlRedirect: string
}
