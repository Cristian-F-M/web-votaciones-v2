'use client'
import { useElection } from '@/states/useElection'
import type { Candidate, User } from '@/types/responseModels'
import {
	IconCalendar,
	IconChartLine,
	IconHistory,
	IconMilitaryAward,
	IconUsers
} from '@tabler/icons-react'
import '@/styles/results.css'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { CandidateBadgeLoader } from '@/components/election/results/CandidateBadgeLoader'
import { CandidateWinnerLoader } from '@/components/election/results/CandidateWinnerLoader'
import { CandidateBadge } from '@/components/election/results/CandidateBadge'
import { ObjectiveItem } from '@/components/candidate/ObjectiveItems'

export function Results() {
	const { election } = useElection()

	if (!election) redirect('/apprentice/no-election')

	const candidateWinner = election.winner

	const participationPercent =
		(election.winnerVoteCount / (election.totalVotes || 1)) * 100

	const endDate = new Date(election.endDate)
	const endWinnerDate = new Date(endDate.setFullYear(endDate.getFullYear() + 1))
	const endWinnerDateString = endWinnerDate.toLocaleDateString('es-CO', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})

	const dateString = endDate.toLocaleDateString('es-CO', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	})

	const timeString = endDate.toLocaleTimeString('es-CO', {
		hour: '2-digit',
		minute: '2-digit'
	})

	const votesPercent = (election.winnerVoteCount / election.totalVotes) * 100

	return (
		<main className="w-11/12 md:w-10/12 mx-auto mt-10 mb-10">
			<div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap">
				<div className="card-stat single--card-stat bg-page-contrast">
					<div className="card-stat--icon bg-blue-200 text-blue-600">
						<IconUsers />
					</div>
					<div>
						<h4>Total de votos</h4>
						<data value={election.totalVotes}>
							{election.totalVotes.toLocaleString()}
							{!election && (
								<span className="block mt-1.5 w-14 h-3 bg-gray-400/70 rounded animate-pulse" />
							)}
						</data>
					</div>
				</div>
				<div className="card-stat single--card-stat bg-page-contrast">
					<div className="card-stat--icon bg-green-200 text-green-600">
						<IconChartLine />
					</div>
					<div>
						<h4>Participación</h4>
						<data
							value={
								Number.isNaN(participationPercent) ? 0 : participationPercent
							}
						>
							{election && `${participationPercent}%`}
							{!election && (
								<span className="block mt-1.5 w-14 h-3 bg-gray-400/70 rounded animate-pulse" />
							)}
						</data>
					</div>
				</div>
				<div className="card-stat single--card-stat bg-page-contrast">
					<div className="card-stat--icon bg-orange-200 text-orange-600">
						<IconMilitaryAward />
					</div>
					<div>
						<h4>Candidatos</h4>
						<data value={election.candidates.length}>
							{election.candidates.length}
							{!election && (
								<span className="block mt-1.5 w-14 h-3 bg-gray-400/70 rounded animate-pulse" />
							)}
						</data>
					</div>
				</div>
			</div>

			<a
				className="flex flex-row items-center gap-1.5 mt-10 w-fit ml-auto bg-gray-200/70 text-sm px-2 py-1.5 rounded text-gray-800 border border-gray-300/40 hover:bg-gray-200 dark:bg-gray-700/80 dark:border-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-700/90 transition-colors"
				href="/apprentice/history"
			>
				<IconHistory className="mt-px size-4 text-primary dark:text-dark-primary" />
				Ver historial
			</a>

			<div className="grid-stats lg:grid grid-cols-8 grid-rows-8 gap-4 mt-2 flex flex-col">
				<div className="col-span-5 row-span-7 card-stat !p-0 bg-page-contrast">
					<header className="bg-blue-100/80 px-2 py-4 text-center !text-2xl rounded-t-lg dark:bg-blue-950/70">
						<h1>Resultados de la votación</h1>
					</header>
					<main className="px-2 my-8 w-full md:w-10/12 mx-auto">
						{!candidateWinner && <CandidateWinnerLoader />}

						{!!candidateWinner && (
							<div className="flex flex-col items-center gap-2 w-full mx-auto">
								<div className="candidate-image aspect-square w-9/12 md:w-5/12 border border-gray-300/70 rounded dark:border-gray-600/80">
									<Image
										className="size-full object-cover"
										// TODO -> Change this empty string to default image from the config state
										src={candidateWinner.user.profile.imageUrl ?? ''}
										alt={`Foto de el candidato ganador ${candidateWinner.user.profile.name}`}
									/>
								</div>
								<div className="flex flex-col items-center gap-3 w-10/12 mx-auto">
									<h2 className="text-2xl font-semibold text-center">
										{candidateWinner.user.profile.name}
									</h2>
									<div className="w-full h-2 bg-gray-300 rounded">
										<div
											style={{ width: `${votesPercent}%` }}
											role="progressbar"
											aria-valuenow={votesPercent}
											aria-valuemin={0}
											aria-valuemax={100}
											tabIndex={0}
											className="h-full rounded bg-primary dark:bg-dark-primary"
										/>
									</div>
									<div className="text-gray-500 flex flex-col items-center leading-4.5 dark:text-gray-400 text-sm md:text-base">
										<p>{votesPercent}% de los votos totales</p>
										<p className="text-xs md:text-sm">
											{election.winnerVoteCount}{' '}
											{election.winnerVoteCount === 1 ? 'voto' : 'votos'}
										</p>
									</div>

									<div className="space-y-3 w-10/12 max-h-44 overflow-y-auto overscroll-contain py-4 custom-scroll px-4">
										{election.winner.objectives.map((objective, index) => (
											<ObjectiveItem
												key={objective.id}
												objective={objective}
												index={index}
											/>
										))}
									</div>
								</div>
							</div>
						)}
					</main>
				</div>
				<div className="col-span-3 row-span-6 col-start-6 card-stat max-h-[523px] overflow-y-auto !p-0 bg-page-contrast">
					<header className="bg-blue-100/80 px-2 py-4 text-center !text-2xl rounded-t-lg dark:bg-blue-950/70">
						<h2>Todos los candidatos</h2>
					</header>
					<main className="space-y-2 px-4">
						{!election &&
							Array.from({ length: 2 }).map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: This is a loader, it does not matter
								<CandidateBadgeLoader key={index} />
							))}

						{election && (
							<>
								<CandidateBadge candidate={candidateWinner} isWinner />

								{election.candidates.map((candidate) => {
									if (candidateWinner?.id === candidate.id) return null
									return (
										<CandidateBadge
											candidate={candidate}
											key={candidate.id}
											isWinner={false}
										/>
									)
								})}
							</>
						)}

						<span className="text-center text-sm text-gray-500 block w-fit mx-auto mt-6 mb-4 dark:text-gray-400">
							No hay más candidatos
						</span>
					</main>
				</div>
				<div className="col-span-5 row-span-1 col-start-1 row-start-8 flex items-center gap-2 card-stat order-4 bg-page-contrast">
					<div className="text-primary dark:text-dark-primary">
						<IconCalendar />
					</div>
					<div>
						<h3 className="text-gray-700 text-xs md:text-sm leading-3 dark:text-gray-400">
							El aprendiz será representante hasta
						</h3>
						<p className="font-semibold text-lg dark:text-gray-200">
							{election && endWinnerDateString}
							{!election && (
								<span className="block mt-1.5 w-3/4 h-3 bg-gray-400/70 rounded animate-pulse" />
							)}
						</p>
					</div>
				</div>
				<div className="col-span-3 row-span-2 col-start-6 row-start-7 card-stat bg-page-contrast">
					<header>Información de la votación</header>
					<main className="text-xs md:text-sm [&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li_span:first-child]:text-gray-600 [&_li_span:nth-child(2)]:font-semibold dark:[&_li_span:first-child]:text-gray-400">
						<ul className="space-y-1">
							<li>
								<span>Fecha de finalización</span>
								<span>
									{election && dateString}
									{!election && (
										<span className="block mt-1.5 w-14 h-3 bg-gray-400/70 rounded animate-pulse" />
									)}
								</span>
							</li>
							<li>
								<span>Hora de finalización</span>
								<span>
									{election && timeString}
									{!election && (
										<span className="block mt-1.5 w-14 h-3 bg-gray-400/70 rounded animate-pulse" />
									)}
								</span>
							</li>
							<li>
								<span>Votantes registrados</span>
								<span>
									{election.totalVotes}
									{!election && (
										<span className="block mt-1.5 w-14 h-3 bg-gray-400/70 rounded animate-pulse" />
									)}
								</span>
							</li>
							<li>
								<span>Votos validos</span>
								<span>
									{election.totalVotes}
									{!election && (
										<span className="block mt-1.5 w-14 h-3 bg-gray-400/70 rounded animate-pulse" />
									)}
								</span>
							</li>
						</ul>
					</main>
				</div>
			</div>
		</main>
	)
}
