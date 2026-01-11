import type { ThProps } from '@/types/table'
import { th } from 'zod/locales'

export function Th({ className, children, ...props }: ThProps) {
	return <th {...props}>{children}</th>
}
