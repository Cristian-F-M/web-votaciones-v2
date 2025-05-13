export interface User {
	id: string
	name: string
	lastname: string
	typeDocument: string
	document: string
	phone: string
	email: string
	imageUrl?: string
	role: string
	voted: boolean
	typeDocumentUser: TypeDocument
	roleUser: Role
}

export type UserHome = Pick<
	User,
	| 'id'
	| 'name'
	| 'lastname'
	| 'document'
	| 'email'
	| 'phone'
	| 'voted'
	| 'imageUrl'
	| 'typeDocumentUser'
>

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
