export default function X(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Close</title>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M18 6 6 18M6 6l12 12" />
		</svg>
	)
}
