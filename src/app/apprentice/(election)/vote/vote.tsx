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

  // TODO -> use candidate from the api
	useEffect(() => {
		const candidates: Candidate[] = [
			{
				id: 'cand-1',
				userId: 'user-1',
				description:
					'Candidato con experiencia en liderazgo y trabajo en equipo. Este es un complemente de la descripción de el candidato juan perez para ver como se comporta cuando la descripción es muy larga.',
				isActive: true,
				objectives: [
					{
						id: 'obj-1',
						text: 'Mejorar procesos internos',
						candidateId: 'cand-1'
					}
				],
				user: {
					id: 'user-1',
					email: 'juan.perez@example.com',
					document: '12345678',
					typeDocumentId: 'td-1',
					roleId: 'role-1',
					typeDocument: {
						id: 'td-1',
						name: 'DNI',
						code: 'DNI'
					},
					role: {
						id: 'role-1',
						name: 'Candidato',
						code: 'CANDIDATE'
					},
					profile: {
						name: 'Juan',
						lastname: 'Pérez',
						phone: '3001234567',
						imageUrl: imageUrlFallback
					},
					shiftType: {
						id: 'shift-1',
						name: 'Diurno',
						code: 'DAY'
					}
				}
			},
			{
				id: 'cand-2',
				userId: 'user-2',
				description: 'Perfil enfocado en resultados y análisis.',
				isActive: true,
				objectives: [
					{
						id: 'obj-2',
						text: 'Optimizar recursos',
						candidateId: 'cand-2'
					}
				],
				user: {
					id: 'user-2',
					email: 'maria.gomez@example.com',
					document: '87654321',
					typeDocumentId: 'td-1',
					roleId: 'role-1',
					typeDocument: {
						id: 'td-1',
						name: 'DNI',
						code: 'DNI'
					},
					role: {
						id: 'role-1',
						name: 'Candidato',
						code: 'CANDIDATE'
					},
					profile: {
						name: 'María',
						lastname: 'Gómez',
						phone: '3019876543',
						imageUrl: imageUrlFallback
					},
					shiftType: {
						id: 'shift-2',
						name: 'Nocturno',
						code: 'NIGHT'
					}
				}
			},
			{
				id: 'cand-3',
				userId: 'user-3',
				description: 'Candidato junior con alto potencial.',
				isActive: false,
				objectives: [],
				user: {
					id: 'user-3',
					email: 'carlos.lopez@example.com',
					document: '11223344',
					typeDocumentId: 'td-2',
					roleId: 'role-1',
					typeDocument: {
						id: 'td-2',
						name: 'Pasaporte',
						code: 'PASS'
					},
					role: {
						id: 'role-1',
						name: 'Candidato',
						code: 'CANDIDATE'
					},
					profile: {
						name: 'Carlos',
						lastname: 'López',
						phone: '3021112233',
						imageUrl: imageUrlFallback
					},
					shiftType: {
						id: 'shift-1',
						name: 'Diurno',
						code: 'DAY'
					}
				}
			},
			{
				id: 'cand-4',
				userId: 'user-4',
				description: 'Especialista en comunicación y relaciones públicas.',
				isActive: true,
				objectives: [
					{
						id: 'obj-4',
						text: 'Fortalecer la comunicación institucional',
						candidateId: 'cand-4'
					}
				],
				user: {
					id: 'user-4',
					email: 'ana.martinez@example.com',
					document: '44556677',
					typeDocumentId: 'td-1',
					roleId: 'role-1',
					typeDocument: {
						id: 'td-1',
						name: 'DNI',
						code: 'DNI'
					},
					role: {
						id: 'role-1',
						name: 'Candidato',
						code: 'CANDIDATE'
					},
					profile: {
						name: 'Ana',
						lastname: 'Martínez',
						phone: '3034455667',
						imageUrl: imageUrlFallback
					},
					shiftType: {
						id: 'shift-3',
						name: 'Mixto',
						code: 'MIX'
					}
				}
			},
			{
				id: 'cand-5',
				userId: 'user-5',
				description: 'Perfil técnico con experiencia en sistemas.',
				isActive: true,
				objectives: [],
				user: {
					id: 'user-5',
					email: 'luis.ramirez@example.com',
					document: '99887766',
					typeDocumentId: 'td-2',
					roleId: 'role-1',
					typeDocument: {
						id: 'td-2',
						name: 'Pasaporte',
						code: 'PASS'
					},
					role: {
						id: 'role-1',
						name: 'Candidato',
						code: 'CANDIDATE'
					},
					profile: {
						name: 'Luis',
						lastname: 'Ramírez',
						phone: '3049988776',
						imageUrl: imageUrlFallback
					},
					shiftType: {
						id: 'shift-1',
						name: 'Diurno',
						code: 'DAY'
					}
				}
			},
			{
				id: 'cand-6',
				userId: 'user-6',
				description: 'Candidata con enfoque social y comunitario.',
				isActive: false,
				objectives: [
					{
						id: 'obj-6',
						text: 'Impulsar programas comunitarios, este es un texto muy largo para ver como se comporta la tarjeta cuando la descripción es muy larga.',
						candidateId: 'cand-6'
					}
				],
				user: {
					id: 'user-6',
					email: 'sofia.hernandez@example.com',
					document: '55667788',
					typeDocumentId: 'td-1',
					roleId: 'role-1',
					typeDocument: {
						id: 'td-1',
						name: 'DNI',
						code: 'DNI'
					},
					role: {
						id: 'role-1',
						name: 'Candidato',
						code: 'CANDIDATE'
					},
					profile: {
						name: 'Sofía',
						lastname: 'Hernández',
						phone: '3055566778',
						imageUrl: imageUrlFallback
					},
					shiftType: {
						id: 'shift-2',
						name: 'Nocturno',
						code: 'NIGHT'
					}
				}
			}
		]

		setTimeout(() => setCandidates(candidates), 1000)
	}, [])

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
