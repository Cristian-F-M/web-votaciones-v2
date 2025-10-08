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
	votedCandidateId: Candidate['id']
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
	| 'roleUser'
	| 'votedCandidateId'
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

export interface Candidate {
	id: string
	userId: Pick<User, 'id'>
	imageUrl: string
	description: string
	votes: string
	user: Pick<User, 'id' | 'name' | 'lastname' | 'document' | 'email'>
}

export interface Vote {
	id: string
	userId: Pick<User, 'id'>
	cantVotes: number
	totalVote: number
	startDate: string
	endDate: string
	finishVoteInfo: {
		totalVotes: number
		cantVotesWinner: number
		candidates: Candidate[]
	}
	isFinished: boolean
}
