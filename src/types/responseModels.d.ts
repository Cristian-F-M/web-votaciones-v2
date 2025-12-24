import type * as Models from './models'

export interface User {
	id: Models.User['id']
	email: Models.User['email']
	document: Models.User['document']
	typeDocumentId: User['typeDocumentId']
	roleId: User['roleId']

	typeDocument: Pick<TypeDocument, 'id' | 'name' | 'code'>
	role: Pick<Role, 'id' | 'name' | 'code'>
	profile: Pick<Profile, 'name' | 'lastname' | 'phone' | 'imageUrl'>
	shiftType: Pick<ShiftType, 'id' | 'name' | 'code'>
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
	totalVotes: Models.Election['totalVotes']
	apprenticeCount: Models.Election['apprenticeCount']
	winnerVoteCount: Models.Election['winnerVoteCount']
	winner: Models.Election['winner']
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

export interface Candidate {
	id: Models.Candidate['id']
	userId: Models.Candidate['userId']
	description: Models.Candidate['description']
	isActive: Models.Candidate['isActive']
	objectives: Models.Candidate['objectives']

	user: User
}
