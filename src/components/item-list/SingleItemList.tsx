import X from '@/icons/X'
import { twMerge } from 'tailwind-merge'

export function SingleItemList({
	item,
	handleRemoveItem,
	name,
	className,
	removeItemProps,
	...props
}: {
	item: { id: string; text: string }
	handleRemoveItem: (id: string) => void
	name?: string
	removeItemProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
} & React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="flex flex-row justify-between items-center bg-gray-100 rounded border border-gray-300/80  text-pretty dark:bg-page-dark-bg-contrast dark:border-gray-700">
			<input
				className={twMerge('w-full h-[stretch] px-3 py-2', className)}
				defaultValue={item.text}
				name={name || 'items[]'}
				type="text"
				{...props}
			/>
			<button
				{...removeItemProps}
				className={twMerge(
					'mr-1 text-red-700 hover:bg-red-200 [&_svg]:size-4 cursor-pointer transition-colors p-0.5 rounded dark:text-red-500 dark:hover:bg-red-400/20',
					removeItemProps?.className
				)}
				type="button"
				onClick={() => handleRemoveItem(item.id)}
			>
				<X />
			</button>
		</div>
	)
}
