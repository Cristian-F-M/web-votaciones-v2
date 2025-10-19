import '@/styles/candidateWinner.css'
import Icon from '@/icons/Alert'
import Users from '@/icons/Users'
import ChartLine from '@/icons/ChartLine'
import MilitaryAward from '@/icons/MilitaryAward'
import { useVote } from '@/states/useVote'
import Calendar from '@/icons/Calendar'
import type { GetCandidatesResponse } from '@/types/api'
import { doFetch } from '@/utils/fetch'
import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import type { Candidate } from '@/types/models'

const API_URL = process.env.NEXT_PUBLIC_API_URL

function CandidateSingleCard({
	candidate,
	isWinner = false
}: {
	candidate: Candidate | undefined
	isWinner?: boolean
}) {
	const { vote } = useVote()

	if (candidate) console.log(Object.keys(candidate))

	if (!candidate || Object.keys(candidate).length === 0) return null

	const votesPercent = (candidate.votes / (vote?.totalVotes ?? 0)) * 100

	return (
		<div className="border border-gray-200/70 px-4 py-3 rounded flex flex-col gap-1 dark:border-gray-700/80">
			<div className="text-sm flex items-center justify-between [&_p]:text-xs [&_p]:text-gray-600 dark:[&_p]:text-gray-400">
				<h4 className="font-semibold">
					{isWinner && (
						<span className="text-xs bg-(--color) px-2 py-0.5 rounded text-white font-semibold mr-2 dark:bg-(--color)/90 dark:text-gray-200">
							Ganador
						</span>
					)}
					{candidate.user.name}
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
					className={`h-full rounded ${isWinner ? 'bg-(--color)' : 'bg-gray-600'}`}
				/>
			</div>
			<p className="text-xs text-gray-600 dark:text-gray-400">
				{candidate.votes} {candidate.votes === 1 ? 'voto' : 'votos'}
			</p>
		</div>
	)
}

export function CandidateWinner() {
	const { vote } = useVote()
	const [candidates, setCandidates] = useState<Candidate[]>([])
	const candidateFallback: Candidate = {
		id: 'CandidateFallback',
		user: {
			id: 'UserFallback',
			name: 'Candidato',
			lastname: 'Candidato',
			document: 'Candidato',
			email: 'Candidato'
		},
		imageUrl: 'https://via.placeholder.com/150',
		description: 'Candidato',
		votes: 0,
		userId: { id: 'UserFallback' }
	}
	const candidateWinner =
		vote?.finishVoteInfo.candidates[0] ?? candidateFallback

	const participationPercent =
		((vote?.totalVotes ?? 0) / (vote?.finishVoteInfo?.cantApprentices ?? 0)) *
		100

	const endDate = new Date(vote?.endDate ?? '')
	const endWinnerDate = new Date(endDate.setFullYear(endDate.getFullYear() + 1))
	const endWinnerDateString = endWinnerDate.toLocaleDateString('es-CO', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})

	const getCandidates = useCallback(() => {
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

	useEffect(() => {
		getCandidates()
	}, [getCandidates])

	const dateString = endDate.toLocaleDateString('es-CO', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	})

	const timeString = endDate.toLocaleTimeString('es-CO', {
		hour: '2-digit',
		minute: '2-digit'
	})

	const votesPercent =
		((candidateWinner.votes ?? 0) / (vote?.totalVotes ?? 0)) * 100

	return (
		<main className="w-10/12 mx-auto mt-10">
			<div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap">
				<div className="card-stat single--card-stat">
					<div className="card-stat--icon bg-blue-200 text-blue-600">
						<Users />
					</div>
					<div>
						<h4>Total de votos</h4>
						<data value={vote?.totalVotes}>
							{(vote?.totalVotes ?? 0).toLocaleString()}
						</data>
					</div>
				</div>
				<div className="card-stat single--card-stat">
					<div className="card-stat--icon bg-green-200 text-green-600">
						<ChartLine />
					</div>
					<div>
						<h4>Participación</h4>
						<data value={participationPercent}>{participationPercent}%</data>
					</div>
				</div>
				<div className="card-stat single--card-stat">
					<div className="card-stat--icon bg-orange-200 text-orange-600">
						<MilitaryAward />
					</div>
					<div>
						<h4>Candidatos</h4>
						<data value={candidates.length}>{candidates.length}</data>
					</div>
				</div>
			</div>

			<div className="grid-stats lg:grid grid-cols-8 grid-rows-8 gap-4 mt-10 flex flex-col">
				<div className="col-span-5 row-span-7 card-stat !p-0">
					<header className="bg-blue-100/80 px-2 py-4 text-center !text-2xl rounded-t-lg dark:bg-blue-950/70">
						<h1>Resultados de la votación</h1>
					</header>
					<main className="px-2 my-8 flex flex-col items-center gap-2 w-10/12 mx-auto">
						<div className="candidate-image aspect-square w-5/12 border border-gray-300/70 rounded dark:border-gray-600/80">
							<img
								src={`${API_URL}/candidate/image/${candidateWinner.id}`}
								alt={`Foto de el candidato ganador ${candidateWinner.user.name}`}
							/>
						</div>
						<div className="flex flex-col items-center gap-3 w-10/12 mx-auto">
							<h2 className="text-2xl font-semibold text-center">
								{candidateWinner.user.name}
							</h2>
							<div className="w-full h-2 bg-gray-300 rounded">
								<div
									style={{ width: `${votesPercent}%` }}
									role="progressbar"
									aria-valuenow={votesPercent}
									aria-valuemin={0}
									aria-valuemax={100}
									tabIndex={0}
									className="h-full rounded bg-(--color)"
								/>
							</div>
							<div className="text-gray-500 flex flex-col items-center leading-4.5 dark:text-gray-400">
								<p>{votesPercent}% de los votos totales</p>
								<p className="text-sm">
									{candidateWinner.votes ?? 0}{' '}
									{candidateWinner.votes === 1 ? 'voto' : 'votos'}
								</p>
							</div>
						</div>
					</main>
				</div>
				<div className="col-span-3 row-span-6 col-start-6 card-stat max-h-[523px] overflow-y-auto">
					<header>
						<h2>Todos los candidatos</h2>
					</header>
					<main className="space-y-2">
						<CandidateSingleCard candidate={candidateWinner} isWinner />

						{candidates.map((candidate) => {
							if (candidateWinner.id === candidate.id)
								return null
							return (
								<CandidateSingleCard
									candidate={candidate}
									key={candidate.id}
									isWinner={false}
								/>
							)
						})}

            <span className="text-center text-sm text-gray-500 block w-fit mx-auto mt-6 dark:text-gray-400">No hay más candidatos</span>
					</main>
				</div>
				<div className="col-span-5 row-span-1 col-start-1 row-start-8 flex items-center gap-2 card-stat order-4">
					<div className="text-(--color)">
						<Calendar />
					</div>
					<div>
						<h3 className="text-gray-700 text-sm leading-3 dark:text-gray-400">
							El aprendiz será representante hasta
						</h3>
						<p className="font-semibold text-lg dark:text-gray-200">{endWinnerDateString}</p>
					</div>
				</div>
				<div className="col-span-3 row-span-2 col-start-6 row-start-7 card-stat">
					<header>Información de la votación</header>
					<main className="text-sm [&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li_span:first-child]:text-gray-600 [&_li_span:nth-child(2)]:font-semibold dark:[&_li_span:first-child]:text-gray-400">
						<ul className="space-y-1">
							<li>
								<span>Fecha de finalización</span>
								<span>{dateString}</span>
							</li>
							<li>
								<span>Hora de finalización</span>
								<span>{timeString}</span>
							</li>
							<li>
								<span>Votantes registrados</span>
								<span>{vote?.finishVoteInfo.totalVotes}</span>
							</li>
							<li>
								<span>Votos validos</span>
								<span>{vote?.finishVoteInfo.totalVotes}</span>
							</li>
						</ul>
					</main>
				</div>
			</div>
		</main>
	)
}
