'use client'
import { useUser } from '@/states/useUser'
import '@/styles/apprentice.css'
import Clock from '@/icons/Clock'
import { useRemainingTime } from '@/hooks/useRemainingTime'
import { useEffect, useMemo, useState } from 'react'
import { SingleTimeCard } from '@/components/SingleTimeCard'
import AlertIcon from '@/icons/Alert'
import type { Candidate } from '@/types/models'
import { doFetch } from '@/utils/fetch'
import type { GetCandidatesResponse } from '@/types/api'
import { CandidateCard } from '@/components/candidate/CandidateCard'
import { CandidateCardFallback } from '@/components/candidate/CandidateCardFallback'
import { enqueueSnackbar } from 'notistack'

export default function IndexPage() {
	const user = useUser((state) => state.user)
	const targetDate = useMemo(() => new Date(1755710169727), [])
	const { remainingTime } = useRemainingTime(targetDate)
	const [candidates, setCandidates] = useState<Candidate[] | null>(null)

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
			<main className="w-full mt-10 mb-14">
				<h1 className="w-fit mx-auto text-4xl">
					Votaciones para representante {new Date().getFullYear()}
				</h1>
				<span className="block w-fit mx-auto text-gray-600">
					Participa en el proceso democrático y elige a tu candidato preferido
				</span>
				<div className="remaining-time w-10/12 mx-auto mt-7">
					<h3 className="flex flex-row gap-1 items-center w-fit mx-auto text-xl">
						<Clock className="text-(--color) size-6" /> Tiempo restante para
						votar
					</h3>
					<div className="mx-auto w-fit mt-2 flex flex-row gap-1 items-center justify-center border dark:border-(--color)/50 border-(--color) px-14 py-4 rounded">
						<SingleTimeCard label="días" value={remainingTime.days} />
						<span className="time-separator">:</span>
						<SingleTimeCard label="horas" value={remainingTime.hours} />
						<span className="time-separator">:</span>
						<SingleTimeCard label="min" value={remainingTime.minutes} />
						<span className="time-separator">:</span>
						<SingleTimeCard label="seg" value={remainingTime.seconds} />
					</div>
				</div>

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
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<CandidateCardFallback key={index} />
						))}
				</div>
			</main>
		</>
	)
}
