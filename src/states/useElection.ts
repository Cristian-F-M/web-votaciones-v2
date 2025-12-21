import type { Election } from '@/types/responseModels'
import { create } from 'zustand'

interface ElectionState {
	election: Election | null
	setElection: (election: ElectionState['election']) => void
}

export const useElection = create<ElectionState>()((set) => ({
	election: null,
	setElection: (election) => set({ election })
}))
