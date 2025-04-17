export interface GetTypeDocumentsResponse {
	ok: boolean
	typesDocuments: SelectItem[]
	error?: string
}

export interface LoginResponse {
	ok: boolean
	message: string
	urlRedirect: string
}
