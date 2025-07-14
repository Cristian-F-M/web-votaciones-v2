export function SingleTimeCard({
	label,
	value
}: { label: string; value: string }) {
	return (
		<div className="single-time flex flex-col justify-center items-center">
			<span className="time-value text-(--color) text-2xl">{value}</span>
			<span className="time-label dark:text-gray-400  text-sm">{label}</span>
		</div>
	)
}
