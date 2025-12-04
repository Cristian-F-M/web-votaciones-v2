import type { GetCandidateResponse } from '@/types/api'
import type { Candidate, UserHome } from '@/types/models'
import { doFetch } from '@/utils/fetch'
import { create } from 'zustand'

interface CandidateState {
	candidate: Candidate | null
	setCandidate: (candidate: CandidateState['candidate']) => void
	getCandidate: (
		userId: UserHome['id'] | undefined
	) => Promise<Candidate | null>
}

const getCandidate: CandidateState['getCandidate'] = async (userId) => {
	if (!userId) return null
	const { ok, ...data } = await doFetch<GetCandidateResponse>({
		url: `/candidate?userId=${userId}`
	})
	if (!ok) return null
	if ('candidate' in data) return data.candidate
}

export const useCandidate = create<CandidateState>()((set) => ({
	candidate: null,
	setCandidate: (candidate) => set({ candidate }),
	getCandidate
}))
