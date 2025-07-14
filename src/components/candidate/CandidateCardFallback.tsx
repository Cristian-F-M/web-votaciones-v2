export function CandidateCardFallback() {
	return (
		<div className="w-[260px] h-[380px] border border-gray-400/60 rounded-[15px] shadow py-3 animate-pulse">
			<div className="w-11/12 mx-auto h-[230px] rounded bg-gray-300 dark:bg-gray-700" />

			<div className="w-40 h-4 bg-gray-300 dark:bg-gray-700 mx-auto mt-4" />
			<div className="w-fit mx-auto mt-2">
				<span className="block w-48 h-2 bg-gray-300 dark:bg-gray-700 " />
				<span className="block w-32 h-2 bg-gray-300 dark:bg-gray-700 mt-px mx-auto" />
			</div>
			<div className="w-11/12 mx-auto h-9 bg-gray-300 dark:bg-gray-700 mt-7 rounded" />
		</div>
	)
}
