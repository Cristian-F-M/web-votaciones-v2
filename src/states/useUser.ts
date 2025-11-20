import type { UserHomeResponse } from '@/types/api'
import type { UserHome } from '@/types/models'
import { doFetch } from '@/utils/fetch'
import { create } from 'zustand'

interface UserState {
	user: UserHome | null
	setUser: (user: UserState['user']) => void
	getUser: () => Promise<UserHome | null>
}

export const useUser = create<UserState>()((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	getUser: getUser
}))

async function getUser() {
	const { ok, ...data } = await doFetch<UserHomeResponse>({ url: '/user' })
	if (!ok) return null
	if ('user' in data) return data.user
}
