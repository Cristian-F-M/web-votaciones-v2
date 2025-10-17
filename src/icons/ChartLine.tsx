export default function ChartLine(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Chart line</title>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M4 19h16M4 15l4-6 4 2 4-5 4 4" />
		</svg>
	)
}
