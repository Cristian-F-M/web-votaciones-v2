import AlertIcon from '@/icons/Alert'
import { CandidateCard } from '@/components/candidate/CandidateCard'
import { CandidateCardFallback } from '@/components/candidate/CandidateCardFallback'
import { useEffect, useState } from 'react'
import type { Candidate } from '@/types/models'
import type { GetCandidatesResponse } from '@/types/api'
import { doFetch } from '@/utils/fetch'
import { enqueueSnackbar } from 'notistack'
import { CountDown } from '@/components/apprentice/CountDown'
import { useVote } from '@/states/useVote'

export function Vote() {
	const [targetDate, setTargetDate] = useState<Date | null>(null)
	const [candidates, setCandidates] = useState<Candidate[] | null>(null)
	const { vote } = useVote()

	useEffect(() => {
		if (!vote) return
		const endDate = new Date(vote.endDate)
		setTargetDate(endDate)
	}, [vote])

	useEffect(() => {
		async function getCandidates() {
			const res = await doFetch<GetCandidatesResponse>({
				url: '/candidate/all'
			})

			if (!res.ok) {
				enqueueSnackbar(res.message, {
					variant: 'error',
					autoHideDuration: 3000,
					preventDuplicate: true
				})
				return
			}

			setCandidates(res.candidates)
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
