import type { Objective } from '@/types/responseModels'

export function ObjectiveItem({
	objective,
	index
}: { objective: Objective; index: number }) {
	return (
		<div className="bg-primary/30 dark:bg-dark-primary/30 rounded px-4 py-3 flex flex-row items-center gap-2">
			<span className="flex items-center justify-center bg-primary text-white rounded-full p-2 aspect-square w-6 h-6 text-sm">
				{index + 1}
			</span>
			<span className="text-sm text-gray-800 dark:text-gray-200">
				{objective.text}
			</span>
		</div>
	)
}
