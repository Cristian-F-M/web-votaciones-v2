'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconMoon, IconSunHigh, IconSunMoon } from '@tabler/icons-react'

export function ToggleTheme({ className }: { className?: string }) {
	const toggleThemeRef = useRef<HTMLDivElement>(null)
	const [theme, setTheme] = useState<typeof window.colorTheme>()

	useEffect(() => {
		setTheme(window.colorTheme)
	}, [])

	const toggleTheme = useCallback((e: MouseEvent) => {
		const documentElement = document.documentElement
		const isDarkTheme = documentElement.classList.contains('dark')

		const themeToSet = isDarkTheme ? 'light' : 'dark'
		window.colorTheme = themeToSet
		setTheme(themeToSet)

		documentElement.classList.toggle('dark')
		documentElement.style.colorScheme = themeToSet
		documentElement.style.colorScheme = isDarkTheme ? 'light' : 'dark'
		localStorage.setItem('color-theme', isDarkTheme ? 'light' : 'dark')
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
			className="relative cursor-pointer size-6 p-1 rounded [&_svg]:size-4 flex flex-col items-center justify-center border border-gray-300/50 hover:bg-gray-200 dark:hover:bg-gray-700 [&_svg]:absolute"
		>
			<style>
				{`
        svg {
          transition: all 0.3s allow-discrete;
        }

        svg.hidden {
          scale: 0;
          opacity: 0;
        }
        
        svg.block {
          scale: 1;
          opacity: 1;

          @starting-style {
            scale: 0;
            opacity: 0;
          }
        }
      `}
			</style>
			<IconSunMoon className={`${!theme ? 'block' : 'hidden'}`} />
			<IconMoon className={`${theme === 'dark' ? 'block' : 'hidden'}`} />
			<IconSunHigh className={`${theme === 'light' ? 'block' : 'hidden'}`} />
		</div>
	)
}
