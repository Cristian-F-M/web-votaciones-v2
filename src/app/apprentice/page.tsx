'use client'
import { useUser } from '@/states/useUser'
import '@/styles/apprentice.css'
import { Vote } from '@/components/apprentice/vote'
import { useCallback, useEffect, useState } from 'react'
import { doFetch } from '@/utils/fetch'
import { snackbar } from '@/utils/dom'
import type { ElectionGetCurrentResponse } from '@/types/api'
import { useElection } from '@/states/useElection'
import { LoaderVote } from '@/components/apprentice/LoaderVote'
import { NoElection } from '@/components/apprentice/NoElection'
import { LoadingWinner } from '@/components/apprentice/LoadingWinner'
import { CandidateWinner } from '@/components/apprentice/CandidateWinner'

export default function IndexPage() {
	const [loading, setLoading] = useState(true)
	const [isFinished, setIsFinished] = useState(false)
	const [timeIsUp, setTimeIsUp] = useState(false)
	const user = useUser((state) => state.user)
	const setElection = useElection((state) => state.setElection)
	const election = useElection((state) => state.election)

	const getVote = useCallback(async () => {
		const res = await doFetch<ElectionGetCurrentResponse>({
			url: '/election'
		})

		setLoading(false)

		if (!res.ok) {
			snackbar({ message: res.message, variant: 'error' })
			return
		}

		setElection(res.data)
	}, [setElection])

	useEffect(() => {
		getVote()
	}, [getVote])

	useEffect(() => {
		if (!election) return
		const startDate = new Date(election.startDate)
		const endDate = new Date(election.endDate)

		const now = new Date()

		setIsFinished(election.status === 'finished')

		if (now < startDate) {
			return
		}

		if (now > endDate) {
			setTimeIsUp(true)
			return
		}
	}, [election])

	const loadingVote = !election && loading
	const loadingWinner = election && timeIsUp && !isFinished
	const voteNotStarted = election && !timeIsUp
	const voteFinished = election && timeIsUp && isFinished

	useEffect(() => {
		const currentYear = new Date().getFullYear()

		let newTitle =
			'Votaciones - Vota en línea por tu candidato preferido en CGAO'

		if (loadingVote)
			newTitle = `Votaciones - Cargando votaciones para el año ${currentYear}`
		if (loadingWinner)
			newTitle = `Votaciones - Cargando resultados para conocer el ganador del año ${currentYear}`
		if (voteNotStarted)
			newTitle =
				'Votaciones - Las votaciones aún no han iniciado, por favor vuelva pronto'
		if (voteFinished)
			newTitle = `Votaciones - Mira los resultados de la votación del año ${currentYear}`

		document.title = newTitle
	}, [loadingVote, loadingWinner, voteNotStarted, voteFinished])

	return (
		<>
			<main className="md:w-full mt-10 mb-14 w-11/12 mx-auto">
				<h1 className="w-fit mx-auto md:text-4xl text-2xl text-center">
					Votaciones para representante {new Date().getFullYear()}
				</h1>
				<span className="block w-fit mx-auto text-gray-600 md:text-base text-sm text-center">
					Participa en el proceso democrático y elige a tu candidato preferido
				</span>

				{loadingVote && <LoaderVote />}
				{!loadingVote && !election && <NoElection />}
				{voteNotStarted && <Vote />}
				{loadingWinner && <LoadingWinner />}
				{voteFinished && <CandidateWinner />}
			</main>
		</>
	)
}
