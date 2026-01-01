export function CandidateWinnerLoader() {
	return (
		<div className="flex flex-col items-center gap-2 w-full mx-auto [&_*]:animate-pulse">
			<div className="w-10/12 md:max-w-[200px] h-auto aspect-[1/1.05] bg-gray-400/50 rounded" />

			<div className="flex flex-col justify-center items-center w-full">
				<span className="block bg-gray-400/50 w-46 h-3 rounded mt-2" />
				<span className="block bg-primary/50 dark:bg-dark-primary/50 w-11/12 h-2 rounded mt-2" />
				<span className="block bg-gray-400/50 w-32 h-2 rounded mt-2" />
				<span className="block bg-gray-400/50 w-12 h-2 rounded mt-1" />
			</div>

			<hr className="!my-4" />

			<div className="space-y-3 w-full max-h-44 overflow-y-auto overscroll-contain py-4 custom-scroll">
				{Array.from({ length: 3 }).map((_, index) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: It does not matter
						key={index}
						className="block w-10/12 bg-gray-400/50 rounded h-10 mx-auto"
					/>
				))}
			</div>
		</div>
	)
}
