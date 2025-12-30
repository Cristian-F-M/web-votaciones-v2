import type { Candidate } from '@/types/responseModels'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { useCallback, useEffect, useState } from 'react'
import { doFetch } from '@/utils/fetch'
import type { CandidateVoteResponse } from '@/types/api'
import { snackbar } from '@/utils/dom'
import { useUser } from '@/states/useUser'
import { YourVoteBadge } from './YourVoteBadge'

export function CandidateCard({ candidate }: { candidate: Candidate }) {
	const [voting, setVoting] = useState(false)
	const { user, getUser, setUser } = useUser()
	const [isThisCandidateVoted, setIsThisCandidateVoted] = useState(false)
	const [alreadyVoted, setAlreadyVoted] = useState(false)

	const handleMouseEnter = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			event.currentTarget.style.setProperty(
				'--rotate-deg',
				Math.random() > 0.5 ? '-1deg' : '1deg'
			)
		},
		[]
	)

	const handleMouseClick = useCallback((event: React.MouseEvent) => {
		event.preventDefault()
		window.location.hash = `details-${event.currentTarget.id}`
	}, [])

	const handleVote = useCallback(
		async (event: React.MouseEvent) => {
			event.stopPropagation()
			event.preventDefault()

			setVoting(true)

			const response = await doFetch<CandidateVoteResponse>({
				url: `/candidate/vote/${candidate.id}`,
				method: 'POST',
				body: {}
			})

			setVoting(false)

			const variant = response.ok ? 'success' : 'error'
			snackbar({ message: response.message, variant })

			if (!response.ok) return

			const user = await getUser()
			setUser(user)
		},
		[candidate, getUser, setUser]
	)

	useEffect(() => {
		if (!user || !user.vote) return

		setAlreadyVoted(!!user.vote)
		setIsThisCandidateVoted(user.vote.candidateId === candidate.id)
	}, [user, candidate])

	let buttonText = 'Votar'

	if (alreadyVoted) buttonText = 'Ya votaste'
	if (isThisCandidateVoted) buttonText = 'Tu voto'

	return (
		<div
			onClick={handleMouseClick}
			onMouseEnter={handleMouseEnter}
			className="group md:w-[240px] w-[220px] max-h-[420px] border border-gray-400/60 rounded shadow relative pb-5 flex flex-col hover:scale-105 transition-all hover:rotate-(--rotate-deg) cursor-pointer"
			id={`${candidate.id}`}
		>
			{isThisCandidateVoted && (
				<YourVoteBadge className="absolute -rotate-25 -top-1 -left-4" />
			)}

			<div className="mx-auto h-7/12">
				<Image
					src={candidate.user.profile.imageUrl}
					alt={`Foto de perfil de el candidato ${candidate.user.profile.name} ${candidate.user.profile.lastname ?? ''}`}
					width={250}
					height={300}
					className="size-full object-cover aspect-square"
					loading="eager"
				/>
			</div>

			<hr />

			<div className="px-3.5 flex flex-col flex-1 gap-1.5">
				<h2 className="text-center text-2xl font-semibold underline md:no-underline group-hover:underline">
					{candidate.user.profile.name} {candidate.user.profile.lastname ?? ''}
				</h2>
				<p className="text-sm text-gray-600 dark:text-gray-500 text-center text-balance line-clamp-3">
					{candidate.description}
				</p>

				<Button
					className="mt-auto"
					showLoader
					type="button"
					onClick={handleVote}
					disabled={voting || alreadyVoted}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	)
}
