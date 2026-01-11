'use client'
import type { MenuItemProps } from '@/types/SideMenu'
import * as Icons from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export function MenuItem({
	href,
	prefix,
	onClick,
	className,
	...props
}: MenuItemProps) {
	const url = `${prefix ?? ''}${href}`
	const active = usePathname() === url
	const isDeclarative = 'label' in props && 'icon' in props
	const Icon = isDeclarative
		? (Icons[props.icon ?? 'IconExternalLink'] as React.ElementType)
		: undefined

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLAnchorElement>) => {
			if (onClick) onClick(event)
			if (active) event.preventDefault()
		},
		[onClick, active]
	)

	return (
		<a
			onClick={handleClick}
			className={twMerge(
				'px-2 py-2.5 rounded hover:bg-primary/50 hover:dark:bg-dark--primary/50 hover:border-transparent text-sm flex flex-row items-center gap-2 [&_svg]:size-5 [&.active]:bg-primary [&.active]:dark:bg-dark-primary [&.active]:border-transparent transition-colors bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:border-gray-600',
				active && 'active',
				className
			)}
			href={url}
		>
			{!isDeclarative && props.children}
			{isDeclarative && (
				<>
					{Icon && <Icon />}
					{props.label}
				</>
			)}
		</a>
	)
}
