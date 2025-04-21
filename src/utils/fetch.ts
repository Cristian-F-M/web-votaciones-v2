import type { GETResponse } from '@/types/api'

const { API_URL } = process.env

export async function doFetch<T>(
	url: `/${string}`,
	options: RequestInit
): Promise<GETResponse<T>> {
	try {
		const response = await fetch(`${API_URL}${url}`, options)

		const contentType = response.headers.get('Content-Type')
		const isJson = contentType?.includes('application/json')

		const responseData = isJson ? await response.json() : null

		if (!response.ok)
			return {
				ok: false,
				message: responseData?.message || 'Error desconocido'
			}

		return {
			ok: true,
			data: responseData as T
		}
	} catch (error: any) {
		return {
			ok: false,
			message: error?.message || 'Error de red'
		}
	}
}
