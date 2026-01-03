import type { Election } from '@/types/responseModels'
import { create } from 'zustand'

interface ElectionState {
	election: Election | null
	setElection: (election: ElectionState['election']) => void
}

export const useElection = create<ElectionState>()((set) => ({
	election: null,
	setElection: (election) => {
		if (!election) return

		election.startAt = new Date(election.startAt)
		election.endAt = new Date(election.endAt)

		set({ election })
	}
}))
