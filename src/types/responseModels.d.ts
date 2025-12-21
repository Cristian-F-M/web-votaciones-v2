import type * as Models from './models'

export interface UserProfile {
	id: Models.User['id']
	email: Models.User['email']
	document: Models.User['document']
	typeDocumentId: User['typeDocumentId']
	roleId: User['roleId']

	typeDocument: Pick<TypeDocument, 'id' | 'name'>
	role: Pick<Role, 'id' | 'name'>
	profile: Pick<Profile, 'name' | 'lastname' | 'phone' | 'imageUrl'>
}

export interface ResetPasswordFindUser {
	id: Models.User['id']
	email: Models.User['email']
}

export interface Config {
	name: Models.Config['name']
	value: Models.Config['value']
	code: Models.Config['code']
}

export interface TypeDocument {
	id: Models.TypeDocument['id']
	name: Models.TypeDocument['name']
	code: Models.TypeDocument['code']
}

export interface ShiftType {
  id: Models.ShiftType['id']
  name: Models.ShiftType['name']
  code: Models.ShiftType['code']
}

export interface Election {
  id: Models.Election['id']
  startDate: Models.Election['startDate']
  endDate: Models.Election['endDate']
  status: Models.Election['status']
  shiftType: ShiftType
}

export interface Role {
  id: Models.Role['id']
  name: Models.Role['name']
  code: Models.Role['code']
}