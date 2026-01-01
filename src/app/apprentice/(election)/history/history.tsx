'use client'
import type { ElectionGetAllResponse } from '@/types/api'
import type { Election } from '@/types/responseModels'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { IconArrowLeft } from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

function ElectionCard({ election }: { election: Election }) {
	const percentage = Math.round(
		(election.winnerVoteCount / (election.totalVotes || 1)) * 100
	)

	return (
		<div className="min-w-[280px] w-auto max-w-[300px] rounded-lg overflow-hidden border border-gray-500/40 bg-page-contrast shadow dark:border-gray-600/50">
			<header className="bg-primary dark:bg-dark-primary px-4 py-2 text-lg uppercase font-semibold">
				<h2 className="text-center">Año {election.startDate.getFullYear()}</h2>
			</header>

			<main className="p-4 flex flex-col items-center">
				<div className="w-4/12 h-auto mx-auto rounded-full bg-primary/20 p-2">
					<Image
						className="size-full object-cover"
						// TODO -> Change this empty string to default image from the config state
						src={
							election.winner.user.profile.imageUrl ||
							'https://res.cloudinary.com/dp6ucd28f/image/upload/v1763591326/votaciones-v2/users/base_user.webp'
						}
						alt={election.winner.user.profile.name}
						width={150}
						height={150}
					/>
				</div>
				<div className="flex flex-col items-center mt-2">
					<h3 className="font-bold text-lg">
						{election.winner.user.profile.name}{' '}
						{election.winner.user.profile.lastname ?? ''}
					</h3>
					<p className="text-3xl text-primary dark:text-dark-primary font-semibold">
						{percentage}%
					</p>
					<span className="block text-xs text-gray-500 dark:text-gray-400">
						{election.winnerVoteCount}{' '}
						{election.winnerVoteCount === 1 ? 'voto' : 'votos'}
					</span>
				</div>
			</main>
		</div>
	)
}

function ElectionCardLoader() {
	return (
		<div className="min-w-[280px] w-auto max-w-[300px] rounded-lg overflow-hidden border border-gray-400/40 bg-page-contrast shadow dark:border-gray-700/50 animate-pulse pb-10">
			<div className="px-4 py-2 bg-primary/60 dark:bg-dark-primary/40 h-10" />
			<div className="w-full my-4">
				<div className="w-20 h-auto aspect-square mx-auto rounded-full bg-gray-500/60 dark:bg-gray-500/40 p-2" />
				<div className="w-20 h-2 mt-2 mx-auto rounded bg-gray-500/60 dark:bg-gray-500/40" />
				<div className="w-14 h-2 mt-1 mx-auto rounded bg-gray-500/60 dark:bg-gray-500/40" />
				<div className="w-8 h-2 mt-1 mx-auto rounded bg-gray-500/60 dark:bg-gray-500/40" />
			</div>
		</div>
	)
}

export function History() {
	const [elections, setElections] = useState<Election[] | null>(null)

	const getAllElections = useCallback(async () => {
		const response = await doFetch<ElectionGetAllResponse>({
			url: '/election/all'
		})

		if (!response.ok)
			return snackbar({ message: response.message, variant: 'error' })

		setElections(response.data)
	}, [])

	useEffect(() => {
		getAllElections()
	}, [getAllElections])

	return (
		<div className="w-10/12 mx-auto mt-6 mb-10">
			<a
				href="/apprentice/results"
				className="flex flex-row items-center gap-1.5 [&_svg]:size-4 text-sm text-gray-800 bg-gray-200/70 w-fit px-2.5 py-1 rounded hover:bg-gray-200 border-gray-300/40 border dark:bg-gray-700/80 dark:border-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-700/90 transition-colors mb-4"
			>
				<IconArrowLeft />
				Volver a resultados
			</a>

			<header className="mt-10">
				<h1 className="text-center md:text-left text-2xl md:text-4xl font-semibold">
					Historial de votaciones
				</h1>
			</header>

			<main className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 gap-y-8 justify-center">
				{!elections &&
					Array.from({ length: 5 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: It does not matter
						<ElectionCardLoader key={index} />
					))}

				{elections && elections.length <= 0 && (
					<span className="block w-full md:w-9/12 mx-auto md:mt-10 text-center text-sm md:text-lg text-gray-700 dark:text-gray-400">
						Por el momento no tenemos registro de votaciones pasadas, la próxima
						votación se mostrará aquí cuando esta finalice...
					</span>
				)}

				{elections?.map((e) => (
					<ElectionCard key={e.id} election={e} />
				))}
			</main>
		</div>
	)
}
