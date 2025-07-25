export function SingleTimeCard({
	label,
	value
}: { label: string; value: string }) {
	return (
		<div className="single-time flex flex-col justify-center items-center">
			<span className="time-value text-(--color) md:text-2xl text-base">{value}</span>
			<span className="time-label dark:text-gray-400 md:text-sm text-xs">{label}</span>
		</div>
	)
}
