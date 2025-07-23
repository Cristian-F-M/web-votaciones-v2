import type { Vote } from '@/types/models'
import { create } from 'zustand'

interface VoteState {
  vote: Vote | null
  setVote: (vote: VoteState['vote']) => void
}

export const useVote = create<VoteState>()((set) => ({
  vote: null,
  setVote: (vote) => set({ vote })
}))
