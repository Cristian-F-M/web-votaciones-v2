import type { AllowedSessionType, ConfigScope } from '.'

export type AllowedRole =
	| 'USER'
	| 'APPRENTICE'
	| 'ADMINISTRATOR'
	| 'DEVELOPER'
	| 'CANDIDATE'

export interface Candidate {
	id: string
	userId: string
	description: string
	isActive: boolean
	createdAt?: Date
	updatedAt?: Date

	votes: Vote[]
	objectives: Objective[]
	user: User
}

export interface Config {
	id: string
	name: string
	code: string
	description: string
	value: string
	scope: ConfigScope
	createdAt?: Date
	updatedAt?: Date
}

export interface Role {
	id: string
	name: string
	code: AllowedRole
	description: string
	createdAt?: Date
	updatedAt?: Date

	users: User[]
}

export interface Session {
	id: string
	token: string
	expires: Date
	userId: string
	type: AllowedSessionType

	user: User
}

export interface TypeDocument {
	id: string
	name: string
	code: string
	description: string
	createdAt?: Date
	updatedAt?: Date

	users: User[]
}

export interface User {
	id: string
	typeDocumentId: string
	document: string
	email: string
	shiftTypeId: string
	roleId: string
	createdAt?: Date
	updatedAt?: Date

	typeDocument: TypeDocument
	votes: Vote[]
	deviceTokens: DeviceToken[]
	role: Role
	passwordResets: PasswordReset[]
	sessions: Session[]
	profile: Profile
	candidate?: Candidate
	shiftType: ShiftType
}

export interface PasswordReset {
	id: string
	userId: string
	attemps: number
	isActive: boolean
	nextSendAt: Date | null | undefined
	expiresAt: Date | null | undefined
	usedAt: Date | null | undefined
	createdAt?: Date
	updatedAt?: Date

	user: User
}

export interface DeviceToken {
	id: string
	userId: string
	deviceType: 'ios' | 'android' | 'web'
	lastUsedAt: Date | null | undefined
	isActive: boolean
	createdAt?: Date
	updatedAt?: Date

	user: User
}

export interface Vote {
	id: string
	userId: string
	candidateId: string
	electionId: string
	createdAt?: Date
	updatedAt?: Date

	candidate: Candidate
	user: User
}

export interface Election {
	id: string
	apprenticeCount: number
	totalVotes: number
	winnerVoteCount: number
	winner: Candidate
  candidates: Candidate[]
	startDate: Date
	endDate: Date
	status: 'active' | 'finished' | 'canceled'
	shiftTypeId: string
	createdAt?: Date
	updatedAt?: Date

	votes: Vote[]
	shiftType: ShiftType
}

export interface Objective {
	id: string
	text: string
	candidateId: string
	createdAt?: Date
	updatedAt?: Date

	candidate: Candidate
}

export interface ShiftType {
	id: string
	name: string
	code: string
	description: string
	startTime: string
	endTime: string
	createdAt?: Date
	updatedAt?: Date

	elections: Election[]
	users: User[]
}

export interface Profile {
	id: string
	userId: string
	name: string
	lastname: string
	phone: string
	imageUrl: string | undefined | null
	createdAt?: Date
	updatedAt?: Date

	user: User
}
