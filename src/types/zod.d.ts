export interface ZodError {
	code: string
	path: string[]
	message: string
	origin: string
	code: string
	[key: string]: unknown
}

export type ZodErrors = ZodError[]
