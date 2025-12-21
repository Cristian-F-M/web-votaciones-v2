import type { LoginErrors, RegisterErrors } from './forms'
import type { SelectItem } from './input'
import type {
	UserProfile,
	ResetPasswordFindUser,
	TypeDocument,
	Role,
	Config,
	Profile
} from './responseModels'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ProcessedErrors {
	[key: string]: string | undefined | null
}

export interface FetchProps {
	url: `/${string}`
	method?: HttpMethod
	body?: FormData | Record<string, any> | string | null
	headers?: HeadersInit
	cache?: RequestInit['cache']
}

export interface DatabaseError {
	message: string
	path: string
	type: string
}

export interface FormErrors {
	[key: string]: FormError[] | DatabaseError[]
}

export interface FormError {
	message: string
	path: string
	type: string
}

// --- Shared Types ---
export interface SuccessResponse<T = undefined> {
	ok: true
	message?: string
	data?: T
	[key: string]: any
}

export interface ErrorResponse {
	ok: false
	message: string
}

export interface ValidationErrorResponse {
	ok: false
	message: string
	errors: FormErrors
}

export type StandardAPIResponse<T = undefined> =
	| SuccessResponse<T>
	| ValidationErrorResponse

// --- Auth Routes ---
/**
 * Response for the endpoint `/` (GET)
 */
export type AuthCheckSessionResponse = { ok: true; urlRedirect: string }

/**
 * Response for the endpoint `/register` (POST)
 */
export type AuthRegisterResponse =
	| { ok: true; message: string; urlRedirect: string }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/login` (POST)
 */
export type AuthLoginResponse =
	| ValidationErrorResponse
	| {
			ok: true
			message: string
			urlRedirect: string
	  }

/**
 * Response for the endpoint `/logout` (POST)
 */
export type AuthLogoutResponse = {
	ok: true
	message: string
	urlRedirect: string
}

/**
 * Response for the endpoint `/validate-permissions` (GET)
 */
export type AuthValidatePermissionsResponse = { ok: true; message: string }

// --- Config Routes ---
/**
 * Response for the endpoint `/config/all` (GET)
 */
export type ConfigGetAllResponse = { ok: true; data: Config[] }

/**
 * Response for the endpoint `/config/:q` (GET)
 */
export type ConfigGetOneResponse = { ok: true; data: Config }

/**
 * Response for the endpoint `/config/` (PUT)
 */
export type ConfigUpdateResponse = { ok: true; message: string; config: Config }

/**
 * Response for the endpoint `/config/:id` (DELETE)
 */
export type ConfigDeleteResponse = { ok: true; message: string }

// --- TypeDocument Routes ---
/**
 * Response for the endpoint `/typeDocument/all` (GET)
 */
export type TypeDocumentGetAllResponse = { ok: true; data: TypeDocument[] }

/**
 * Response for the endpoint `/typeDocument/:q` (GET)
 */
export type TypeDocumentGetOneResponse = { ok: true; data: TypeDocument }

/**
 * Response for the endpoint `/typeDocument/` (PUT)
 */
export type TypeDocumentUpdateResponse = {
	ok: true
	message: string
	data: TypeDocument
}

/**
 * Response for the endpoint `/typeDocument/:id` (DELETE)
 */
export type TypeDocumentDeleteResponse = {
	ok: true
	message: string
}

// --- User Routes ---
/**
 * Response for the endpoint `/user/` (GET)
 */
export type UserGetProfileResponse = {
	ok: true
	data: UserProfile
}

/**
 * Response for the endpoint `/user/notification-token`
 */
export type UserUpdateNotificationTokenResponse = { ok: true; message: string }

/**
 * Response for the endpoint `/user/profile`
 */
export type UserUpdateProfileResponse =
	| { ok: true; message: string }
	| ValidationErrorResponse

// --- Election Routes ---
/**
 * Response for the endpoint `/election/`
 */
export type ElectionGetCurrentResponse = { ok: true; data: Election }

/**
 * Response for the endpoint `/election/` (POST)
 */
export type ElectionCreateResponse =
	| {
			ok: true
			message: string
			election: Election
	  }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/election/finish`
 */
export type ElectionFinishResponse =
	| {
			ok: true
			message: string
			election: Election
	  }
	| ValidationErrorResponse

// --- Candidate Routes ---
/**
 * Response for the endpoint `/candidate/` (GET)
 */
export type CandidateGetOneResponse = { ok: true; data: Candidate }

/**
 * Response for the endpoint `/candidate/all`
 */
export type CandidateGetAllResponse = { ok: true; data: Candidate[] }

/**
 * Response for the endpoint `/candidate/` (PATCH)
 */
export type CandidateCreateResponse =
	| { ok: true; message: string }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/candidate/:id`
 */
export type CandidateDeleteResponse =
	| { ok: true; message: string }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/candidate/vote/:id`
 */
export type CandidateVoteResponse =
	| { ok: true; message: string }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/candidate/profile`
 */
export type CandidateUpdateProfileResponse =
	| { ok: true; message: string }
	| ValidationErrorResponse

// --- Role Routes ---
/**
 * Response for the endpoint `/role/all`
 */
export type RoleGetAllResponse = { ok: true; data: Role[] }

/**
 * Response for the endpoint `/role/:q`
 */
export type RoleGetOneResponse =
	| { ok: true; data: Role }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/role/` (PUT)
 */
export type RoleUpdateResponse =
	| { ok: true; message: string; role: Role }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/role/:id`
 */
export type RoleDeleteResponse =
	| { ok: true; message: string; role: Role }
	| ValidationErrorResponse

// --- Reset Password Routes ---
/**
 * Response for the endpoint `/reset-password/find-user`
 */
export type PasswordResetFindUserResponse =
	| {
			ok: true
			user: ResetPasswordFindUser
			nextSendAt: Date | false
	  }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/reset-password/send-password-reset-code`
 */
export type PasswordResetSendCodeResponse =
	| { ok: true; message: string; nextSendAt: Date }
	| { ok: false; message: string; nextSendAt?: Date }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/reset-password/verify-password-reset-code`
 */
export type PasswordResetVerifyCodeResponse =
	| { ok: true; message: string }
	| ValidationErrorResponse

/**
 * Response for the endpoint `/reset-password/update-password`
 */
export type PasswordResetUpdateResponse =
	| { ok: true; message: string; urlReturn: string }
	| { ok: false; message: string }
	| ValidationErrorResponse
