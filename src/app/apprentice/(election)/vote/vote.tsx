'use client'
import { CountDown } from '@/components/apprentice/CountDown'
import { CandidateCard } from '@/components/candidate/CandidateCard'
import { CandidateCardFallback } from '@/components/candidate/CandidateCardFallback'
import { Details } from '@/components/candidate/Details'
import { useUser } from '@/states/useUser'
import type { Candidate } from '@/types/responseModels'
import { useCallback, useEffect, useState } from 'react'
import { useElection } from '@/states/useElection'
import { redirect } from 'next/navigation'
import { IconAlertCircle } from '@tabler/icons-react'
import { doFetch } from '@/utils/fetch'
import { snackbar } from '@/utils/dom'
import type { CandidateGetAllResponse } from '@/types/api'

export function Vote() {
	const { user } = useUser()
	const [candidates, setCandidates] = useState<Candidate[] | null>(null)
	const [candidateShowDetails, setCandidateShowDetails] = useState<
		null | undefined | Candidate
	>(null)
	const [isThisCandidateVoted, setIsThisCandidateVoted] = useState(false)
	const [alreadyVoted, setAlreadyVoted] = useState(false)
	const { election } = useElection()

	const imageUrlFallback =
		'https://res.cloudinary.com/dp6ucd28f/image/upload/v1763591326/votaciones-v2/users/base_user.webp'

	const getCandidates = useCallback(async () => {
		const response = await doFetch<CandidateGetAllResponse>({
			url: '/candidate/all'
		})
		if (!response.ok)
			return snackbar({ message: response.message, variant: 'error' })
		setCandidates(response.data)
	}, [])

	const handleHashChange = useCallback(() => {
		const hash = window.location.hash
		let candidateId = null

		try {
			const id = hash
				.replace('#', '')
				.split('-')
				.slice(1, hash.length)
				.join('-')

			candidateId = id
		} catch {}

		const candidate = (candidates ?? []).find((c) => c.id === candidateId)

		setCandidateShowDetails(candidate)

		document.documentElement.style.overflowY = candidate ? 'hidden' : 'auto'
	}, [candidates])

	useEffect(() => {
		handleHashChange()
		window.addEventListener('hashchange', handleHashChange)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, [handleHashChange])

	useEffect(() => {
		getCandidates()
	}, [getCandidates])

	useEffect(() => {
		if (user) document.title = `${document.title} de la ${user.shiftType.name}`
	}, [user])

	useEffect(() => {
		if (!user || !user.vote) return

		setAlreadyVoted(!!user.vote)
		setIsThisCandidateVoted(user.vote.candidateId === candidateShowDetails?.id)
	}, [user, candidateShowDetails])

	const thereAreCandidates = candidates && candidates.length > 0

	let buttonText = 'Votar'
	if (alreadyVoted) buttonText = 'Ya votaste'
	if (isThisCandidateVoted) buttonText = 'Tu voto'

	if (!election) redirect('no-election')
	if (election.startDate > new Date())
		redirect('apprentice/waiting-start-elections')
	if (election.endDate < new Date()) redirect('apprentice/results')

	return (
		<>
			<div className="">
				<CountDown targetDate={election.endDate} />

				<div className="[&_svg]:size-5 dark:[&_svg]:text-yellow-400 [&_svg]:text-red-700 w-fit mx-auto mt-10 flex flex-row gap-1.5 items-center ">
					<IconAlertCircle />
					<span className="block">Solo puedes votar una vez</span>
				</div>
				<div>
					<div className="candidates w-10/12 mx-auto mt-6 flex flex-row gap-6 flex-wrap justify-center mb-10">
						{thereAreCandidates &&
							candidates.map((candidate) => (
								<CandidateCard key={candidate.id} candidate={candidate} />
							))}

						{!thereAreCandidates &&
							Array.from({ length: 4 }).map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: It doesn't matter
								<CandidateCardFallback key={index} />
							))}
					</div>
				</div>
			</div>

			<Details onClose={handleHashChange} candidate={candidateShowDetails} />
		</>
	)
}
