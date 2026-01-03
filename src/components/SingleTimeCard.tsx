export function SingleTimeCard({
	label,
	value
}: { label: string; value: string }) {
	return (
		<div className="single-time flex flex-col justify-center items-center bg-primary/80 dark:bg-dark-primary/80 text-page-contrast py-5 px-10 rounded-lg w-32 md:w-40">
			<span className="time-value md:text-4xl text-3xl">{value}</span>
			<span className="time-label text-gray-800 dark:text-gray-300 md:text-base text-sm">
				{label}
			</span>
		</div>
	)
}
