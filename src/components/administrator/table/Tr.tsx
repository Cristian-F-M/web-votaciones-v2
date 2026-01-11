import type { TrProps } from '@/types/table'

export function Tr({ children, ...props }: TrProps) {
	return <tr {...props}>{children}</tr>
}
