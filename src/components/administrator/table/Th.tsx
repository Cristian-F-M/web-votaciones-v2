import type { ThProps } from '@/types/table'
import { twMerge } from 'tailwind-merge'

export function Th({ className, children, ...props }: ThProps) {
	return (
		<th className={twMerge(className)} {...props}>
			{children}
		</th>
	)
}
