import Sparkles from '@/icons/Sparkles'
import { twMerge } from 'tailwind-merge'

interface YourVoteBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function YourVoteBadge({ className, ...props }: YourVoteBadgeProps) {
	return (
		<div
			className={twMerge(
				'px-1.5 py-0.5 bg-green-600 rounded text-sm flex items-center gap-1 [&_svg]:size-5 w-fit',
				className
			)}
			{...props}
		>
			<Sparkles />
			Tu voto
		</div>
	)
}
