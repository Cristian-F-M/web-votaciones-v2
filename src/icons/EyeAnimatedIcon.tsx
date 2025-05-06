interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
	isShowingPassword: boolean
}

export function EyeAnimatedIcon({
	isShowingPassword = false,
	...props
}: EyeIconProps) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`eye-icon ${isShowingPassword ? 'eye-off' : ''}`}
			{...props}
		>
			<title>{isShowingPassword ? 'Eye off' : 'Eye'}</title>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
			<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
			<path className="eye-line" d="M3 3l18 18" />
		</svg>
	)
}
