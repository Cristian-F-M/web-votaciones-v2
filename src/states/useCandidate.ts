import type { CandidateGetOneResponse } from '@/types/api'
import type { Candidate, User } from '@/types/models'
import { doFetch } from '@/utils/fetch'
import { create } from 'zustand'

interface CandidateState {
	candidate: Candidate | null
	setCandidate: (candidate: CandidateState['candidate']) => void
	getCandidate: (userId: User['id'] | undefined) => Promise<Candidate | null>
}

const getCandidate: CandidateState['getCandidate'] = async (userId) => {
	if (!userId) return null
	const response = await doFetch<CandidateGetOneResponse>({
		url: `/candidate?userId=${userId}`
	})
	if (!response.ok) return null
	return response.data
}

export const useCandidate = create<CandidateState>()((set) => ({
	candidate: null,
	setCandidate: (candidate) => set({ candidate }),
	getCandidate
}))
