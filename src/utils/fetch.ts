import type { ErrorResponse, FetchProps } from '@/types/api'
import { snackbar } from './dom'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function doFetch<T>({
	url,
	method = 'GET',
	body = null,
	headers = {},
	cache = 'default'
}: FetchProps): Promise<T | ErrorResponse> {
	try {
		let defaultBody: typeof body = null

		const defaultHeaders = new Headers(headers)
		const isBodyFormData = body && body instanceof FormData

		if (method !== 'GET' && !isBodyFormData) defaultBody = JSON.stringify(body)
		if (isBodyFormData) defaultBody = body
		if (!isBodyFormData) defaultHeaders.set('Content-Type', 'application/json')

		defaultHeaders.set('Session-Type', 'WEB')

		const options: RequestInit = {
			method: method,
			headers: defaultHeaders,
			body: defaultBody as BodyInit | null,
			cache,
			credentials: 'include'
		}

		const response = await fetch(`${API_URL}${url}`, options)

		const contentType = response.headers.get('Content-Type')
		const isJson = contentType?.includes('application/json')

		const responseData = isJson ? await response.json() : {}

		if (!response.ok) {
			const message =
				responseData?.message ?? 'Ocurrio un error procesando la solicitud :c'
			snackbar({ message, variant: 'error' })

			return {
				ok: false,
				message,
				...responseData
			}
		}

		return responseData
	} catch (error: any) {
		const message = error?.message
			? error?.message
			: 'Ocurrio un error procesando la solicitud :c'
		snackbar({ message, variant: 'error' })

		return {
			ok: false,
			message
		}
	}
}
