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

		election.startDate = new Date(election.startDate)
		election.endDate = new Date(election.endDate)

		set({ election })
	}
}))
