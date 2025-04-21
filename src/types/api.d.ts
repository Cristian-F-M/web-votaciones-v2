import type { SelectItem } from './input'

export interface typeDocument extends SelectItem {
	code: string
	description: string
}

export interface Role extends SelectItem {
	code: string
	description: string
}

export interface GetTypeDocumentsResponse {
	ok: boolean
	typesDocuments: typeDocument[]
}

export interface LoginResponse {
	ok: boolean
	message: string
	urlRedirect: string
}
