import { twMerge } from 'tailwind-merge'

export function Loader({
	className
}: { className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			role="status"
			className={twMerge(
				'loader size-6 inline-block box-border rounded-full border-r-4 border-r-transparent border-t-[3px] border-t-white border-solid animate-loader',
				className
			)}
		/>
	)
}
