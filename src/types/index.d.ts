export type ConfigScope = 'system' | 'user'
export type AllowedSessionType = 'WEB' | 'MOBILE'

// biome-ignore lint/suspicious/noExplicitAny: It does not matter
export type CustomObject<T = any> = Record<string, T>
