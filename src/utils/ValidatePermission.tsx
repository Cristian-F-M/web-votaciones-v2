'use client'
import { useRouter } from 'next/navigation'
import { doFetch } from './fetch'
import type { ValidatePermissionsResponse } from '@/types/api'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/Loader'
import { enqueueSnackbar } from 'notistack'
import { Forbidden } from '@/components/user/Forbidden'

type AllowRoles =
	| 'User'
	| 'Apprentice'
	| 'Administrator'
	| 'Developer'
	| 'Candidate'

export function ValidatePermission({
	children,
	roles
}: { children: React.ReactNode; roles: AllowRoles[] }) {
	const router = useRouter()
	const [isAllowed, setIsAllowed] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [needLogin, setNeedLogin] = useState(false)

	useEffect(() => {
		async function validatePermissions() {
			const res = await doFetch<ValidatePermissionsResponse>({
				url: '/validate-permissions',
				method: 'POST',
				body: { roles }
			})

			setIsLoading(false)

			if (!res.ok) {
				enqueueSnackbar(res.message, {
					variant: 'error',
					autoHideDuration: 3000
				})
				if ('urlRedirect' in res) {
					router.replace(res.urlRedirect)
					return setNeedLogin(true)
				}

				return setIsAllowed(false)
			}

			setIsAllowed(true)
			setNeedLogin(false)
		}

		validatePermissions()
	}, [roles, router])

	if (isLoading) {
		return (
			<div className="mx-auto w-fit mt-10">
				<Loader className="dark:text-white" />
			</div>
		)
	}

	if (!needLogin && isAllowed) return children
	return <Forbidden />
}
