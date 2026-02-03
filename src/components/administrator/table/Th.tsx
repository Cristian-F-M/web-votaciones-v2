import type { ThProps } from '@/types/table'
import { twMerge } from 'tailwind-merge'

export function Th({ className, children, ...props }: ThProps) {
	return (
		<th
			className={twMerge(
				'data-[order=ASC]:[&_svg]:first:text-gray-100 data-[order=DESC]:[&_svg]:last:text-gray-100 cursor-pointer',
				className
			)}
			{...props}
		>
			{children}
		</th>
	)
}
