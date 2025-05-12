export function InputError({
	id,
	error
}: { id: string; error: string | null | undefined }) {
	return (
		<p
			id={`${id}-error`}
			role="alert"
			aria-live="assertive"
			className={`error-message text-xs text-red-600 dark:text-[#ff7e81] mt-px ${error ? 'opacity-100' : 'opacity-0'}`}
		>
			{error}
		</p>
	)
}
