export function CandidateBadgeLoader() {
	return (
		<div className="border border-gray-200/70 px-4 py-3 rounded flex flex-col gap-1 dark:border-gray-700/80 [&_*]:animate-pulse">
			<div className="text-sm flex items-center justify-between [&_p]:text-xs [&_p]:text-gray-600 dark:[&_p]:text-gray-400">
				<span className="block bg-gray-400/50 w-46 h-3 rounded mt-2" />
				<span className="block bg-gray-400/50 w-12 h-2 rounded mt-1" />
			</div>
			<span className="block w-full h-2 rounded bg-primary/60 dark:bg-dark-primary/60" />
			<span className="block bg-gray-400/50 w-12 h-2 rounded mt-1" />
		</div>
	)
}
