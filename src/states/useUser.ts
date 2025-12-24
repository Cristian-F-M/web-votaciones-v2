import type { UserGetProfileResponse } from '@/types/api'
import type { User } from '@/types/responseModels'
import { doFetch } from '@/utils/fetch'
import { create } from 'zustand'

interface UserState {
	user: User | null
	setUser: (user: UserState['user']) => void
	getUser: () => Promise<User | null>
}

export const useUser = create<UserState>()((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	getUser: getUser
}))

async function getUser() {
	const response = await doFetch<UserGetProfileResponse>({ url: '/user' })
	if (!response.ok) return null
	return response.data
}
