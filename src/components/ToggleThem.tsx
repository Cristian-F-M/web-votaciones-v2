'use client'
import { useCallback, useEffect, useRef } from 'react'
import Moon from '@/icons/Moon'
import Sun from '@/icons/Sun'

export function ToggleTheme() {
	const toggleThemeRef = useRef<HTMLDivElement>(null)

	const toggleTheme = useCallback((e: MouseEvent) => {
		const documentElement = document.documentElement
		const isDarkTheme = documentElement.classList.contains('dark')

		documentElement.classList.toggle('dark')
		documentElement.style.colorScheme = isDarkTheme ? 'light' : 'dark'
	}, [])

	useEffect(() => {
		toggleThemeRef.current?.addEventListener('click', toggleTheme)

		return () => {
			toggleThemeRef.current?.removeEventListener('click', toggleTheme)
		}
	}, [toggleTheme])

	return (
		<div
			ref={toggleThemeRef}
			className="rounded-full p-2 bg-gray-300 hover:bg-gray-200 cursor-pointer border border-gray-400/50 dark:bg-gray-600 dark:hover:bg-gray-500"
		>
			<Moon className="size-4 hidden dark:block" />
			<Sun className="size-4 block dark:hidden" />
		</div>
	)
}
