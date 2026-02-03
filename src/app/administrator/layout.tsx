'use client'
import { ToggleTheme } from '@/components/ToggleTheme'
import { DetailsPanel } from '@/components/administrator/DetailsPanel'
import { SideMenu } from '@/components/administrator/SideMenu'
import { Button } from '@/components/form/Button'
import { UserSettings } from '@/components/user/menu'
import { MENU_ITEMS_ADMINISTRATOR } from '@/constants/SideMenuAdmin'
import LogoSena from '@/icons/LogoSena'
import { useUser } from '@/states/useUser'
import type { UserGetProfileResponse } from '@/types/api'
import { ValidatePermission } from '@/utils/ValidatePermission'
import { doFetch } from '@/utils/fetch'
import { IconMenu2 } from '@tabler/icons-react'
import { useCallback, useEffect } from 'react'

export default function AdministratorLayout({
	children
}: { children: React.ReactNode }) {
	const { setUser } = useUser()

	const getUser = useCallback(async () => {
		const response = await doFetch<UserGetProfileResponse>({ url: '/user' })
		if (!response.ok) return
		setUser(response.data)
	}, [setUser])

	useEffect(() => {
		getUser()
	}, [getUser])

	return (
		<ValidatePermission roles={['ADMINISTRATOR']}>
			<SideMenu id="administrator-side-menu" items={MENU_ITEMS_ADMINISTRATOR} />
			<header className="px-2 py-2.5 flex flex-row items-center justify-between border-b border-gray-300/80 dark:border-gray-700/80">
				<a href="/apprentice">
					<LogoSena className="text-primary size-14 dark:text-dark-primary" />
				</a>
				<div className="flex flex-row gap-2 items-center ">
					<ToggleTheme />
					<UserSettings />
				</div>
			</header>

			<main className="hidden lg:block px-6 mt-8">
				<Button
					showLoader
					type="button"
					className="side-menu-toggler--administrator-side-menu relative size-fit p-1.5 [&_svg]:size-6 group ml-auto"
				>
					<IconMenu2 className="[--path-scale:_50%] [--path-translate-x:_calc(calc(100%_-_var(--path-scale))_/2)] [&_path]:transition-all group-data-[side-menu-open]:[&_path]:last:scale-x-(--path-scale) group-data-[side-menu-open]:[&_path]:last:translate-x-(--path-translate-x) group-data-[side-menu-open]:[&_path]:first:scale-x-(--path-scale) group-data-[side-menu-open]:[&_path]:first:translate-x-(--path-translate-x)" />
				</Button>
				{children}
			</main>
			<div className="lg:hidden text-center">
				No disponible para dispositivos móviles
			</div>

			<DetailsPanel />
		</ValidatePermission>
	)
}
