import { twMerge } from 'tailwind-merge'
import UserIcon from '@/icons/User'
import { useUser } from '@/states/useUser'

interface UserAvatarProps {
	onClick?: React.MouseEventHandler<HTMLDivElement>
	className?: string
}

const commonClasses =
	'size-8 aspect-square rounded-full bg-(--color)/80 border border-gray-300/40 flex flex-row items-center justify-center font-sans'

export function UserAvatarFallback() {
	return (
		<div
			className={twMerge(
				commonClasses,
				'cursor-progress [&_svg]:size-5 [&_svg]:pointer-events-none text-gray-900/90 dark:text-gray-200/90'
			)}
		>
			<UserIcon />
		</div>
	)
}

export function UserAvatar({ onClick, className }: UserAvatarProps) {
	const user = useUser((state) => state.user)
	if (!user) return <UserAvatarFallback />

	return (
		<div
			className={twMerge(commonClasses, 'cursor-pointer', className)}
			onClick={onClick}
		>
			<span className="block size-fit uppercase text-sm select-none">
				{user.name.slice(0, 1)}
			</span>
		</div>
	)
}
