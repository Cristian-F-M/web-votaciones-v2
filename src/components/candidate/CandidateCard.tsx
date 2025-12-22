import type { CandidateVoteResponse } from '@/types/api'
import type { Candidate } from '@/types/models'
import { doFetch } from '@/utils/fetch'
import { snackbar } from '@/utils/dom'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { useUser } from '@/states/useUser'
import Sparkles from '@/icons/Sparkles'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function CandidateCard({ candidate }: { candidate: Candidate }) {
	const [isVoting, setIsVoting] = useState(false)
	const [alreadyVoted, setAlreadyVoted] = useState(false)
	const [isThisCandidateVoted, setIsThisCandidateVoted] = useState(false)
	const user = useUser((state) => state.user)

	const handleVote = useCallback(async () => {
		if (isVoting) return

		setIsVoting(true)

		const data = await doFetch<CandidateVoteResponse>({
			url: '/candidate/vote',
			method: 'POST',
			body: {
				id: candidate.id
			}
		})

		setIsVoting(false)

		if (!data.ok) {
			snackbar({ message: data.message, variant: 'error' })
			return
		}

		setAlreadyVoted(true)
		setIsThisCandidateVoted(true)
		snackbar({ message: data.message, variant: 'success' })
	}, [candidate, isVoting])

	useEffect(() => {
		if (!user) return
		setAlreadyVoted(user.voted)
		setIsThisCandidateVoted(user.votedCandidateId === candidate.id)

		console.log(user.votedCandidateId, candidate.id)
	}, [user, candidate])

	const buttonText = alreadyVoted ? 'Ya votaste' : 'Votar'
	const imageUrl = candidate.user.profile.imageUrl?.startsWith('http')
		? candidate.user.profile.imageUrl
		: `${API_URL}/candidate/image/${candidate.user.profile.imageUrl}`

	return (
		<div className="md:w-[260px] w-[220px] max-h-[380px] border border-gray-400/60 rounded shadow relative">
			{isThisCandidateVoted && (
				<div className="absolute -top-1 -left-4 px-1.5 py-0.5 -rotate-25 bg-green-600 rounded text-sm flex items-center gap-1 [&_svg]:size-5">
					<Sparkles />
					Tu voto
				</div>
			)}
			<div className="md:w-11/12 w-full h-auto mx-auto border-b border-gray-300">
				<img alt={`Foto del candidate ${candidate.user.profile.name}`} src={imageUrl} />
			</div>

			<div className="py-2 px-4">
				<div className="md:w-fit w-full mx-auto flex flex-col items-center mb-4">
					<h4 className="md:text-2xl text-xl">{candidate.user.profile.name}</h4>
					<p className="text-xs text-gray-700 dark:text-gray-400 text-center line-clamp-2">
						{candidate.description}
					</p>
				</div>

				<Button
					type="button"
					onClick={handleVote}
					disabled={isVoting || alreadyVoted}
					loading={isVoting}
					showLoader={true}
					className=""
				>
					{buttonText}
				</Button>
			</div>
		</div>
	)
}
