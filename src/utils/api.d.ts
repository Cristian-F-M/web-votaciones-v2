export interface GetTypeDocumentsResponse {
	ok: boolean
	typesDocuments: SelectItem[]
}

export interface LoginResponse {
	ok: boolean
	message: string
	urlRedirect: string
}
