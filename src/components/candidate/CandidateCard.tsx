import type { VoteResponse } from '@/types/api'
import type { Candidate } from '@/types/models'
import { doFetch } from '@/utils/fetch'
import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { useUser } from '@/states/useUser'
const API_URL = process.env.NEXT_PUBLIC_API_URL

export function CandidateCard({ candidate }: { candidate: Candidate }) {
	const [isVoting, setIsVoting] = useState(false)
	const [alreadyVoted, setAlreadyVoted] = useState(false)
	const user = useUser((state) => state.user)

	const handleVote = useCallback(async () => {
		if (isVoting) return

		setIsVoting(true)

		const data = await doFetch<VoteResponse>({
			url: '/candidate/vote',
			method: 'POST',
			body: {
				id: candidate.id
			}
		})

		setIsVoting(false)

		if (!data.ok) {
			enqueueSnackbar(data.message, {
				variant: 'error'
			})
			return
		}

		setAlreadyVoted(true)
		enqueueSnackbar(data.message, {
			variant: 'success'
		})
	}, [candidate, isVoting])

	useEffect(() => {
		if (!user) return
		setAlreadyVoted(user.voted)
	}, [user])

	const buttonText = alreadyVoted ? 'Ya votaste' : 'Votar'
	const imageUrl = candidate.imageUrl?.startsWith('http')
		? candidate.imageUrl
		: `${API_URL}/candidate/image/${candidate.imageUrl}`

	return (
		<div className="md:w-[260px] w-[220px] max-h-[380px] border border-gray-400/60 rounded shadow">
			<div className="md:w-11/12 w-full h-auto mx-auto border-b border-gray-300">
				<img alt={`Foto del candidate ${candidate.user.name}`} src={imageUrl} />
			</div>

			<div className="py-2 px-4">
				<div className="md:w-fit w-full mx-auto flex flex-col items-center mb-4">
					<h4 className="md:text-2xl text-xl">{candidate.user.name}</h4>
					<p className="text-xs text-gray-700 dark:text-gray-400 text-center line-clamp-2">{candidate.description}</p>
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
