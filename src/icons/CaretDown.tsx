export default function CaretDown(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Caret Down</title>
			<path fill="none" d="M0 0h24v24H0z" />
			<path d="M18 9a1 1 0 0 1 .8 1.6v.1l-6 6a1 1 0 0 1-1.4 0h-.1l-6-6-.1-.2H5V10.1L5 10v-.5l.2-.1v-.2h.2v-.1l.2-.1h.2L6 9H18z" />
		</svg>
	)
}
