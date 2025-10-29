'use client'
import { useUser } from '@/states/useUser'
import '@/styles/apprentice.css'
import { Vote } from '@/components/apprentice/vote'
import { useCallback, useEffect, useState } from 'react'
import { doFetch } from '@/utils/fetch'
import { snackbar } from '@/utils/dom'
import type { GetVoteResponse } from '@/types/api'
import { useVote } from '@/states/useVote'
import { LoaderVote } from '@/components/apprentice/LoaderVote'
import { NoVote } from '@/components/apprentice/NoVote'
import { LoadingWinner } from '@/components/apprentice/LoadingWinner'
import { CandidateWinner } from '@/components/apprentice/CandidateWinner'

export default function IndexPage() {
	const [loading, setLoading] = useState(true)
	const [isFinished, setIsFinished] = useState(false)
	const [timeIsUp, setTimeIsUp] = useState(false)
	const user = useUser((state) => state.user)
	const setVote = useVote((state) => state.setVote)
	const vote = useVote((state) => state.vote)

	const getVote = useCallback(async () => {
		const res = await doFetch<GetVoteResponse>({
			url: '/vote'
		})

		setLoading(false)

		if (!res.ok) {
			snackbar({ message: res.message, variant: 'error' })
			return
		}

		const finishVoteInfo = JSON.parse(res.lastVote.finishVoteInfo)

		setVote({ ...res.lastVote, finishVoteInfo })
	}, [setVote])

	useEffect(() => {
		getVote()
	}, [getVote])

	useEffect(() => {
		if (!vote) return
		const startDate = new Date(vote.startDate)
		const endDate = new Date(vote.endDate)

		const now = new Date()

		setIsFinished(vote.isFinished)

		if (now < startDate) {
			return
		}

		if (now > endDate) {
			setTimeIsUp(true)
			return
		}
	}, [vote])

	const loadingVote = !vote && loading
	const loadingWinner = vote && timeIsUp && !isFinished
	const voteNotStarted = vote && !timeIsUp
	const voteFinished = vote && timeIsUp && isFinished

	useEffect(() => {
		const currentYear = new Date().getFullYear()

		let newTitle = 'Votaciones - Vota en línea por tu candidato preferido en CGAO'
    
		if (loadingVote) newTitle = `Votaciones - Cargando votaciones para el año ${currentYear}`
		if (loadingWinner)
			newTitle = `Votaciones - Cargando resultados para conocer el ganador del año ${currentYear}`
		if (voteNotStarted)
			newTitle = 'Votaciones - Las votaciones aún no han iniciado, por favor vuelva pronto'
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
				{!loadingVote && !vote && <NoVote />}
				{voteNotStarted && <Vote />}
				{loadingWinner && <LoadingWinner />}
				{voteFinished && <CandidateWinner />}
			</main>
		</>
	)
}
