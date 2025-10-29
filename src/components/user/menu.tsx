import { useUser } from '@/states/useUser'
import { UserAvatar } from './UserAvatar'
import UserIcon from '@/icons/User'
import SettingsIcon from '@/icons/Settings'
import SquareArrowRightIcon from '@/icons/SquareArrowRight'
import { useCallback, useEffect } from 'react'
import { doFetch } from '@/utils/fetch'
import type { LogoutResponse } from '@/types/api'
import type { BaseVariant } from 'notistack'
import { snackbar } from '@/utils/dom'
import { useRouter } from 'next/navigation'
import '@/styles/user-avatar.css'

export function UserSettings() {
	const user = useUser((state) => state.user)
	const router = useRouter()

	const handleLogout = useCallback(async () => {
		const data = await doFetch<LogoutResponse>({
			url: '/logout',
			method: 'POST',
			body: {}
		})

		const variant: BaseVariant = data.ok ? 'success' : 'error'

		snackbar({ message: data.message, variant: variant })

		if (!data.ok) return
		if ('urlRedirect' in data) return router.replace(data.urlRedirect)

		router.replace('/')
	}, [router])

	const handleClickShowUserMenu = useCallback(() => {
		const userMenu = document.querySelector('.user-menu')
		if (!userMenu) return
		userMenu.classList.toggle('show')
	}, [])

	useEffect(() => {
		const userMenu = document.querySelector('.user-menu')

		function handleClick(event: MouseEvent) {
			const target = event.target as HTMLElement
			const targetUserAvatar = target.closest('.user-avatar')
			if (!targetUserAvatar) userMenu?.classList.remove('show')
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [])

	return (
		<div className="user-avatar relative">
			<UserAvatar onClick={handleClickShowUserMenu} />

			<div className="user-menu hidden w-64 absolute bg-white border border-gray-400/30 rounded-lg py-2 top-10 right-0 [&_svg]:size-4 dark:bg-slate-900 z-1000">
				<header className="flex flex-row items-center gap-2 [&_span]:leading-4 mb-1.5 border-b border-gray-400/30 p-1.5">
					<UserAvatar className="cursor-default" />
					<div className="flex flex-col">
						<span className="text-sm">
							{user?.name} {user?.lastname}
						</span>
						<span className="text-xs text-gray-500 dark:text-gray-400">
							{user?.email}
						</span>
						<span className="text-xs text-(--color)">
							{user?.roleUser.name}
						</span>
					</div>
				</header>
				<main className="px-1">
					<a href="/apprentice/profile">
						<UserIcon />
						<span>Perfil</span>
					</a>
					<a href="/apprentice/settings">
						<SettingsIcon />
						<span>Configuración</span>
					</a>
					<button className="block w-full" type="button" onClick={handleLogout}>
						<SquareArrowRightIcon />
						<span>Cerrar sesión</span>
					</button>
				</main>
			</div>
		</div>
	)
}
