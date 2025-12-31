'use client'
import '@/styles/apprentice.css'
import { useCallback, useEffect, useState } from 'react'
import { doFetch } from '@/utils/fetch'
import type { ElectionGetCurrentResponse } from '@/types/api'
import { useElection } from '@/states/useElection'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/Loader'

export default function IndexPage() {
	const { election, setElection } = useElection()
	const router = useRouter()

	const getElection = useCallback(async () => {
		const response = await doFetch<ElectionGetCurrentResponse>({
			url: '/election'
		})

		if (!response.ok) return
		setElection(response.data)
	}, [setElection])

	useEffect(() => {
		getElection()
	}, [getElection])

	useEffect(() => {
		if (!election) return router.push('apprentice/no-election')

		const startDate = new Date(election.startDate)
		const endDate = new Date(election.endDate)

		if (new Date() > startDate)
			return router.push('apprentice/waiting-start-elections')

		if (new Date() > endDate) {
			if (election.status !== 'finished')
				return router.push('apprentice/waiting-election-result')
			return router.push('apprentice/winner')
		}
	}, [election, router])

	return (
		<>
			<main className="md:w-full mt-10 mb-14 w-11/12 mx-auto">
				<h1 className="w-fit mx-auto md:text-4xl text-2xl text-center">
					Votaciones para representante {new Date().getFullYear()}
				</h1>
				<span className="block w-fit mx-auto text-gray-600 md:text-base text-sm text-center">
					Participa en el proceso democrático y elige a tu candidato preferido
				</span>

				<div className="w-11/12 md:max-w-[600px] mx-auto flex flex-col items-center border border-gray-300 dark:border-gray-600/70 rounded p-5 mt-10 bg-page-contrast shadow-xl dark:shadow-gray-500/10">
					<h2 className="text-base text-center md:text-2xl mt-2">
						Cargando información de la votación
					</h2>
					<h4 className="text-sm md:text-base text-center text-gray-700 dark:text-gray-500">
						Obteniendo los datos más recientes...
					</h4>
					<p className="text-gray-600 text-center mt-3 dark:text-gray-400 text-xs md:text-base">
						Estamos preparando toda la información necesaria para las
						votaciones. Por favor espera un momento mientras verificamos los
						datos.
					</p>
					<Loader className="size-10 text-primary mt-5" />
				</div>
			</main>
		</>
	)
}
