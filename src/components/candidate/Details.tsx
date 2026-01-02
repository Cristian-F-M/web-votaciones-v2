import type { Candidate } from '@/types/responseModels'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { YourVoteBadge } from './YourVoteBadge'
import { useUser } from '@/states/useUser'
import { useState, useCallback, useEffect } from 'react'
import { Button } from '../Button'
import type { CandidateVoteResponse } from '@/types/api'
import { snackbar } from '@/utils/dom'
import { doFetch } from '@/utils/fetch'
import { IconX, IconClock, IconTarget } from '@tabler/icons-react'
import { ObjectiveItem } from './ObjectiveItems'

export function Details({
	candidate,
	onClose
}: {
	candidate: Candidate | null | undefined
	onClose: () => void
}) {
	const [voting, setVoting] = useState(false)
	const { user, getUser, setUser } = useUser()
	const [isThisCandidateVoted, setIsThisCandidateVoted] = useState(false)
	const [alreadyVoted, setAlreadyVoted] = useState(false)

	const handleCloseCandidateDetails = useCallback(() => {
		history.replaceState(
			null,
			'',
			window.location.pathname + window.location.search
		)
		onClose()
	}, [onClose])

	const handleVote = useCallback(
		async (event: React.MouseEvent) => {
			event.stopPropagation()
			event.preventDefault()

			setVoting(true)

			const response = await doFetch<CandidateVoteResponse>({
				url: `/candidate/vote/${candidate?.id}`,
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
		setIsThisCandidateVoted(user.vote.candidateId === candidate?.id)
	}, [user, candidate])

	let buttonText = 'Votar'

	if (alreadyVoted) buttonText = 'Ya votaste'
	if (isThisCandidateVoted) buttonText = 'Tu voto'

	return (
		<div
			className={twMerge(
				'fixed inset-0 bg-black/30 backdrop-blur-sm',
				!candidate && 'invisible pointer-events-none'
			)}
			onClick={(event: React.MouseEvent) => {
				if ((event.target as HTMLDivElement).closest('.candidate-details'))
					return
				handleCloseCandidateDetails()
			}}
		>
			<div
				className={twMerge(
					'candidate-details transition-all md:w-auto md:min-w-[450px] max-w-[600px] transition-discrete fixed top-0 bottom-0 right-0 w-screen wrap-anywhere bg-page-contrast shadow-2xl [&.show]:starting:translate-x-full translate-x-full flex-col [&.show]:flex [&.show]:translate-x-0 [&.hidden]:hidden [&.hidden]:translate-x-full border-l border-transparent md:dark:border-gray-700 md:border-transparent dark:bg-dark-page-contrast overflow-y-auto pb-10 [&::-webkit-scrollbar]:md:w-1.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:dark:bg-primary/60 [&::-webkit-scrollbar-thumb]:bg-primary/80 [&::-webkit-scrollbar-thumb]:rounded-[2px] [&::-webkit-scrollbar-track]:rounded-[2px] [&::-webkit-scrollbar-track]:dark:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-400 [&::-webkit-scrollbar-track]:md:my-2',
					candidate ? 'show' : 'hidden'
				)}
			>
				{candidate && (
					<>
						<header className="flex flex-row justify-between items-center border-b border-gray-300 dark:border-gray-700 px-6 py-4">
							<h3 className="text-lg font-semibold">Perfil del candidato</h3>
							<button
								type="button"
								className="cursor-pointer p-0.5 [&_svg]:size-5 hover:bg-gray-200 transition-colors rounded active:bg-gray-300 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:active:bg-gray-700"
								onClick={handleCloseCandidateDetails}
							>
								<IconX />
							</button>
						</header>

						<main className="w-10/12 mx-auto mt-8">
							<header className="flex flex-col gap-2">
								<div className="w-6/12 max-w-[130px] rounded-2xl bg-primary/30 dark:bg-dark-primary/20 h-auto mx-auto p-1.5 relative">
									<Image
										src={candidate.user.profile.imageUrl}
										alt={`Foto de perfil de el candidato ${candidate.user.profile.name} ${candidate.user.profile.lastname ?? ''}`}
										width={250}
										height={300}
										className="size-full object-cover"
										loading="eager"
									/>
									{isThisCandidateVoted && (
										<YourVoteBadge className="absolute top-1 -right-5 rotate-20" />
									)}
								</div>

								<div className="flex flex-col justify-center items-center">
									<h2 className="text-2xl font-semibold">
										{candidate.user.profile.name}{' '}
										{candidate.user.profile.lastname ?? ''}
									</h2>
									<p className="text-gray-600 text-sm dark:text-gray-400">
										{candidate.user.role.name}
									</p>
								</div>
							</header>

							<hr />

							<div className="flex flex-row items-center gap-2 bg-gray-200/70 dark:bg-gray-700/90 p-3 rounded">
								<IconClock className="size-5 text-primary dark:text-dark-primary" />
								<span className="text-sm text-gray-800 dark:text-gray-300">
									Jornada:{' '}
									<strong className="text-base font-semibold text-primary dark:text-dark-primary">
										{candidate.user.shiftType.name}
									</strong>
								</span>
							</div>

							<hr />

							<div className="mt-4">
								<h4 className="font-semibold">Descripción</h4>
								<p className="text-sm text-gray-800 text-pretty dark:text-gray-300">
									{candidate.description}
								</p>
							</div>

							<hr />

							<div className="mt-4">
								<h4 className="font-semibold flex flex-row items-center gap-1">
									<IconTarget className="size-5 text-primary dark:text-dark-primary" />
									Objetivos
								</h4>
								<div className="mt-3 flex flex-col justify-center">
									{!candidate ||
										(candidate.objectives.length <= 0 && (
											<span className="text-sm text-gray-600 dark:text-gray-400">
												El/la candidato/a{' '}
												<strong>{candidate.user.profile.name}</strong> no tiene
												objetivos...
											</span>
										))}

									{candidate &&
										candidate.objectives.length > 0 &&
										candidate.objectives.map((objective, index) => (
											<ObjectiveItem
												key={objective.id}
												objective={objective}
												index={index}
											/>
										))}
								</div>
							</div>

							<hr />

							<Button
								onClick={handleVote}
								className="mt-5"
								showLoader
								type="button"
								disabled={voting || alreadyVoted || isThisCandidateVoted}
							>
								{buttonText}
							</Button>
						</main>
					</>
				)}
			</div>
		</div>
	)
}
