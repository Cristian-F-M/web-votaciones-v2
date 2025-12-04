'use client'
import type { UserHomeResponse } from '@/types/api'
import { doFetch } from '@/utils/fetch'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useUser } from '@/states/useUser'
import { useCandidate } from '@/states/useCandidate'
import { ValidatePermission } from '@/utils/ValidatePermission'
import { ToggleTheme } from '@/components/ToggleTheme'
import { UserSettings } from '@/components/user/menu'
import LogoSena from '@/icons/LogoSena'

export default function ApprenticeLayout({
	children
}: { children: React.ReactNode }) {
	const router = useRouter()
	const { user, setUser} = useUser()
	const { getCandidate: getCandidateState, setCandidate } = useCandidate()

	const getUser = useCallback(async () => {
		const { ok, ...data } = await doFetch<UserHomeResponse>({ url: '/user' })
		if (!ok) return
		if ('user' in data) setUser(data.user)
	}, [setUser])

  const getCandidate = useCallback(async () => {
    const candidate = await getCandidateState(user?.id)
    setCandidate(candidate)
  }, [getCandidateState, setCandidate, user])

	useEffect(() => {
		getUser()
	}, [getUser])

	useEffect(() => {
		getCandidate()
	}, [getCandidate])

	return (
		<div className="overflow-x-hidden">
			<header className="px-2 py-2.5 flex flex-row items-center justify-between border-b border-gray-300/80 dark:border-gray-700/80">
				<a href="/apprentice">
					<LogoSena className="text-primary size-14 dark:text-dark-primary" />
				</a>
				<div className="flex flex-row gap-2 items-center ">
					<ToggleTheme />
					<UserSettings />
				</div>
			</header>

			<ValidatePermission roles={['Apprentice', 'Candidate']}>
				{children}
			</ValidatePermission>
		</div>
	)
}
