import type { FetchError, FetchProps } from '@/types/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function doFetch<T>({
	url,
	method = 'GET',
	body = null,
	headers = {},
	cache = 'default'
}: FetchProps): Promise<T | FetchError> {
	try {
		let defaultBody: typeof body = null

		const defaultHeaders = new Headers(headers)
		defaultHeaders.set('Cookie', document.cookie)

		const isBodyFormData = body && body instanceof FormData

		if (method !== 'GET' && !isBodyFormData) defaultBody = JSON.stringify(body)
		if (!isBodyFormData) defaultHeaders.set('Content-Type', 'application/json')

		const options: RequestInit = {
			method: method,
			headers: defaultHeaders,
			body: defaultBody as BodyInit | null,
			cache
		}

		const response = await fetch(`${API_URL}${url}`, options)

		const contentType = response.headers.get('Content-Type')
		const isJson = contentType?.includes('application/json')

		const responseData = isJson ? await response.json() : null

		if (!response.ok && !responseData)
			return {
				ok: false,
				message: responseData?.message || 'Error desconocido'
			}

		return responseData
	} catch (error: any) {
		return {
			ok: false,
			message: error?.message || 'Error de red'
		}
	}
}
