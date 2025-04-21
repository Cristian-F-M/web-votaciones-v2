import type { SelectItem } from './input'

export type FetchSuccess<T> = {
	ok: true
	data: T
}

export type FetchError = {
	ok: false
	message: string
}

export type GETResponse<T> = FetchSuccess<T> | FetchError

export interface typeDocument extends SelectItem {
	code: string
	description: string
}

export interface Role extends SelectItem {
	code: string
	description: string
}

export interface GetTypeDocumentsResponse extends GETResponse<typeDocument[]> {}

export interface LoginResponse {
	ok: boolean
	message: string
	urlRedirect: string
}
