'use client'
import { IconChevronCompactLeft, IconUsers } from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MenuItem } from './MenuItem'
import type { SideMenuProps } from '@/types/SideMenu'
import { Input } from '../form/Input'
import { includes } from '@/utils/global'
import { MENU_ITEMS_ADMINISTRATOR } from '@/constants/SideMenuAdmin'

export function SideMenu({ className }: SideMenuProps) {
	const [open, setOpen] = useState(false)
	const [filteredItems, setFilteredItems] = useState(MENU_ITEMS_ADMINISTRATOR)
	const [query, setQuery] = useState('')

	useEffect(() => {
		const toggleMenu = (event: MouseEvent) => {
			event.preventDefault()
			event.stopPropagation()
			setOpen((prev) => !prev)
		}

		const toggleMenuElements = document.querySelectorAll(
			'.side-menu-toggler'
		) as NodeListOf<HTMLElement>

		for (const e of toggleMenuElements) e.addEventListener('click', toggleMenu)

		return () => {
			for (const e of toggleMenuElements)
				e.removeEventListener('click', toggleMenu)
		}
	}, [])

	useEffect(() => {
		const toggleMenuElements = document.querySelectorAll('.side-menu-toggler')

		for (const e of toggleMenuElements) {
			if (open) e.setAttribute('data-side-menu-open', 'true')
			else e.removeAttribute('data-side-menu-open')
		}
	}, [open])

	const toggleMenu = useCallback(() => {
		setOpen((prev) => !prev)
	}, [])

	const handleClickAnywhere = useCallback(
		(event: MouseEvent) => {
			if (!open) return

			const target = event.target as HTMLElement

			if (!target?.closest('.side-menu-wrapper')) toggleMenu()
		},
		[toggleMenu, open]
	)

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget
			setQuery(value)
		},
		[]
	)

	useEffect(() => {
		const filteredItems = MENU_ITEMS_ADMINISTRATOR.filter(({ label }) => includes(label, query))

		setFilteredItems(filteredItems)
	}, [query])

	useEffect(() => {
		document.addEventListener('click', handleClickAnywhere)

		return () => document.removeEventListener('click', handleClickAnywhere)
	}, [handleClickAnywhere])

	useEffect(() => {
		document.documentElement.style.overflowY = open ? 'hidden' : 'auto'
	}, [open])

	useEffect(() => {
		const menuSide = document.querySelector(
			'.menu-side'
		) as HTMLDivElement | null
		if (!open || !menuSide) return

		setTimeout(() => {
			menuSide?.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		}, 100)

		setQuery('')
	}, [open])

	useEffect(() => {
		const sideMenuWrapper = document.querySelector(
			'.side-menu-wrapper'
		) as HTMLDivElement | null
		const sideMenuIndicator = document.querySelector(
			'.side-menu-indicator'
		) as HTMLDivElement | null

		if (!sideMenuWrapper || !sideMenuIndicator) return

		sideMenuWrapper.style.setProperty(
			'--side-menu-indicator-width',
			`${sideMenuIndicator.offsetWidth}px`
		)
	}, [])

	return (
		<div
			className={twMerge(
				'side-menu-wrapper h-screen w-76 fixed top-0 flex flex-row items-center transition-all [&.open]:translate-x-0 -translate-x-[calc(100%_-_var(--side-menu-indicator-width,_0px))] hover:-translate-x-10/12 cursor-pointer [&.open]:cursor-auto group z-100',
				open && 'open'
			)}
			onClick={() => {
				setOpen(true)
			}}
		>
			<div className="side-menu-indicator h-full order-2 flex items-center ml-1 justify-center w-fit">
				<button
					type="button"
					className={twMerge(
						'cursor-pointer py-1 rounded [&_svg]:duration-500 [&_svg]:size-6 transition-colors hover:bg-primary dark:hover:bg-dark-primary',
						!open && '[&_svg]:rotate-180',
						!open && 'group-hover:bg-primary dark:group-hover:bg-dark-primary'
					)}
					onClick={(event) => {
						event.stopPropagation()
						toggleMenu()
					}}
				>
					<IconChevronCompactLeft />
				</button>
			</div>

			<div
				className={twMerge(
					'menu-side bg-page-contrast size-full p-4 shadow-xl border-r border-gray-300/80 dark:border-gray-600/60 custom-scroll [scrollbar-gutter:_stable] [&::-webkit-scrollbar]:!w-1',
					open && 'overflow-auto',
					className
				)}
			>
				<header>
					<h2 className="text-lg font-semibold">Panel de administrador</h2>

					<div className="mt-10">
						<Input
							onChange={handleSearchChange}
							id="search-menu-item"
							name="search-menu-item"
							label="Busca en el menú"
							value={query}
						/>
					</div>
				</header>
				<ul
					className={twMerge(
						'space-y-2 mt-4',
						!open && '[&_*]:pointer-events-none'
					)}
				>
					{filteredItems.map((item) => (
						<li key={item.href}>
							<MenuItem
								href={item.href}
								icon={item.icon}
								label={item.label}
								prefix="/administrator"
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
