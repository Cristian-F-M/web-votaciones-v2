'use client'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LogoSena from '@/icons/LogoSena'
import { Loader } from '@/components/Loader'
import { doFetch } from '@/utils/fetch'
import type { VerifySessionResponse } from '@/types/api'
import { snackbar } from '@/utils/dom'

export default function Home() {
	const verifySession = useCallback(async () => {
		const data = await doFetch<VerifySessionResponse>({
			url: '/'
		})

		await new Promise((resolve) => setTimeout(resolve, 1000))

		if (!data.ok) {
			snackbar({
				message: data.message,
				variant: 'info'
			})
			if ('urlRedirect' in data) return router.replace(data.urlRedirect)
			router.replace('login')
		}

		if ('urlRedirect' in data) return router.replace(data.urlRedirect)
	}, [])

	const router = useRouter()
	useEffect(() => {
		verifySession()
	}, [verifySession])

	return (
		<div className="min-w-screen min-h-screen bg-(--color)/15 flex items-center justify-center">
			<main
				className="text-(--color) w-10/12 md:max-w-92 flex flex-col items-center bg-white shadow-md 
      px-3 py-6 rounded-md animate-fadeIn"
			>
				<LogoSena className="size-24" />

				<h1 className="flex flex-col items-center text-3xl font-semibold leading-7 mt-6 text-black">
					Votaciones
					<span className="text-base text-(--color)/80">CGAO</span>
				</h1>

				<p className="text-gray-600 text-sm md:text-base text-center px-3 mt-3">
					Estamos verificando tu sesión. Un momento por favor...
				</p>

				<Loader className="text-(--color) size-10 mt-4" />
			</main>
		</div>
	)
}
