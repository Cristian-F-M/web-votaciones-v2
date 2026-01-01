import { useElection } from '@/states/useElection'
import type { Election } from '@/types/responseModels'

interface CandidateBadgeProps {
	candidate: Election['winner']
	isWinner?: boolean
}

export function CandidateBadge({
	candidate,
	isWinner = false
}: CandidateBadgeProps) {
	const { election } = useElection()

	if (!election || !candidate || Object.keys(candidate).length === 0)
		return null

	const votesPercent = (election.winnerVoteCount / election.totalVotes) * 100

	return (
		<div className="border border-gray-200/70 px-4 py-3 rounded flex flex-col gap-1 dark:border-gray-700/80">
			<div className="text-sm flex items-center justify-between [&_p]:text-xs [&_p]:text-gray-600 dark:[&_p]:text-gray-400">
				<h4 className="font-semibold">
					{isWinner && (
						<span className="text-xs bg-primary px-2 py-0.5 rounded text-white font-semibold mr-2 dark:bg-dark-primary/90 dark:text-gray-200">
							Ganador
						</span>
					)}
					{candidate.user.profile.name}
				</h4>
				<p>{votesPercent}%</p>
			</div>
			<div className="w-full h-2 bg-gray-300 rounded">
				<div
					style={{ width: `${votesPercent}%` }}
					role="progressbar"
					aria-valuenow={votesPercent}
					aria-valuemin={0}
					aria-valuemax={100}
					tabIndex={0}
					className={`h-full rounded ${isWinner ? 'bg-primary dark:bg-dark-primary' : 'bg-gray-600'}`}
				/>
			</div>
			<p className="text-xs text-gray-600 dark:text-gray-400">
				{election.winnerVoteCount}{' '}
				{election.winnerVoteCount === 1 ? 'voto' : 'votos'}
			</p>
		</div>
	)
}
