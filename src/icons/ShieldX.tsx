export default function ShieldX(props: React.SVGProps<SVGSVGElement>) {
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
			<title>Shield X</title>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M13.3 20.6 12 21A12 12 0 0 1 3.5 6 12 12 0 0 0 12 3a12 12 0 0 0 8.5 3 12 12 0 0 1-.2 7.4M22 22l-5-5M17 22l5-5" />
		</svg>
	)
}
