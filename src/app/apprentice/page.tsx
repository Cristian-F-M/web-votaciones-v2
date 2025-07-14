'use client'
import { ToggleTheme } from '@/components/ToggleTheme'
import LogoSena from '@/icons/LogoSena'
import { useUser } from '@/states/useUser'
import { UserSettings } from '@/components/user/menu'
import '@/styles/apprentice.css'
import Clock from '@/icons/Clock'
import { useRemainingTime } from '@/hooks/useRemainingTime'
import { useMemo } from 'react'
import { SingleTimeCard } from '@/components/SingleTimeCard'
import AlertIcon from '@/icons/Alert'

export default function IndexPage() {
	const user = useUser((state) => state.user)
	const targetDate = useMemo(() => new Date(1755710169727), [])
	const { remainingTime } = useRemainingTime(targetDate)

	return (
		<>
			<header className="px-2 py-2.5 flex flex-row items-center justify-between border-b border-gray-300/80 dark:border-gray-700/80">
				<LogoSena className="text-(--color) size-14" />
				<div className="flex flex-row gap-2 items-center ">
					<ToggleTheme />
					<UserSettings />
				</div>
			</header>
		</>
	)
}
