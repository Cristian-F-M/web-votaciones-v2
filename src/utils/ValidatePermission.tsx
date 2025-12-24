'use client'
import { useRouter } from 'next/navigation'
import { doFetch } from './fetch'
import type { AuthValidatePermissionsResponse } from '@/types/api'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/Loader'
import { snackbar } from '@/utils/dom'
import { Forbidden } from '@/components/user/Forbidden'
import type { AllowedRole } from '@/types/models'

export function ValidatePermission({
	children,
	roles
}: { children: React.ReactNode; roles: AllowedRole[] }) {
	const router = useRouter()
	const [isAllowed, setIsAllowed] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function validatePermissions() {
			const res = await doFetch<AuthValidatePermissionsResponse>({
				url: '/validate-permissions',
				method: 'POST',
				body: { roles }
			})

			setIsLoading(false)

			if (!res.ok) {
				snackbar({ message: res.message, variant: 'error' })
				return setIsAllowed(false)
			}

			setIsAllowed(true)
		}

		validatePermissions()
	}, [roles])

	if (isLoading) {
		return (
			<div className="mx-auto w-fit mt-10">
				<Loader className="dark:text-white" />
			</div>
		)
	}

	if (isAllowed) return children
	return <Forbidden />
}
