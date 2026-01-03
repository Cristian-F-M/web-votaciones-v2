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
	vote: Vote | null
	deviceToken: DeviceToken | null
	candidate: Candidate | null
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
	winner: Candidate
	candidates: Candidate[]
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
	objectives: Objective[]

	user: Omit<User, 'vote'>
}

export interface Objective {
	id: Models.Objective['id']
	text: Models.Objective['text']
	candidateId: Models.Objective['candidateId']
}

export interface Vote {
	id: Models.Vote['id']
	userId: Models.Vote['userId']
	candidateId: Models.Vote['candidateId']
	electionId: Models.Vote['electionId']
}

export interface DeviceToken {
	id: Models.DeviceToken['id']
	userId: Models.DeviceToken['userId']
	deviceToken: Models.DeviceToken['deviceToken']
}
