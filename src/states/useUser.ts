import type { UserHome } from '@/types/models'
import { create } from 'zustand'

interface UserState {
	user: UserHome | null
	setUser: (user: UserState['user']) => void
}

export const useUser = create<UserState>()((set) => ({
	user: null,
	setUser: (user) => set({ user })
}))
