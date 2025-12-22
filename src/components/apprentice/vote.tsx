import AlertIcon from '@/icons/Alert'
import { CandidateCard } from '@/components/candidate/CandidateCard'
import { CandidateCardFallback } from '@/components/candidate/CandidateCardFallback'
import { useEffect, useState } from 'react'
import type { Candidate } from '@/types/models'
import type { CandidateGetAllResponse } from '@/types/api'
import { doFetch } from '@/utils/fetch'
import { snackbar } from '@/utils/dom'
import { CountDown } from '@/components/apprentice/CountDown'
import { useElection } from '@/states/useElection'

export function Vote() {
	const [targetDate, setTargetDate] = useState<Date | null>(null)
	const [candidates, setCandidates] = useState<Candidate[] | null>(null)
	const { election } = useElection()

	useEffect(() => {
		if (!election) return
		const endDate = new Date(election.endDate)
		setTargetDate(endDate)
	}, [election])

	useEffect(() => {
		async function getCandidates() {
			const res = await doFetch<CandidateGetAllResponse>({
				url: '/candidate/all'
			})

			if (!res.ok) {
				snackbar({ message: res.message, variant: 'error' })
				return
			}

			setCandidates(res.data)
		}

		getCandidates()
	}, [])

	return (
		<>
			<CountDown targetDate={targetDate} />
			<div className="[&_svg]:size-5 dark:[&_svg]:text-yellow-400 [&_svg]:text-red-700 w-fit mx-auto mt-10 flex flex-row gap-1.5 items-center ">
				<AlertIcon />
				<span className="block">Solo puedes votar una vez</span>
			</div>

			<div className="candidates w-10/12 mx-auto mt-6 flex flex-row gap-6 flex-wrap justify-center">
				{candidates &&
					candidates.length > 0 &&
					candidates.map((candidate) => (
						<CandidateCard key={candidate.id} candidate={candidate} />
					))}

				{(!candidates || candidates.length <= 0) &&
					Array.from({ length: 4 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: It doesn't matter
						<CandidateCardFallback key={index} />
					))}
			</div>
		</>
	)
}
