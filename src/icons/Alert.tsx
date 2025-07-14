export default function Alert(props: React.SVGProps<SVGSVGElement>) {
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
			<title>Alert</title>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M19.9 6.3c.7.4 1.1 1.1 1.1 2v7.2c0 .8-.4 1.6-1.2 2l-6.7 4.2a2.3 2.3 0 0 1-2.2 0l-6.7-4.3A2.2 2.2 0 0 1 3 15.5V8.2c0-.8.4-1.5 1.2-2l6.7-4a2.3 2.3 0 0 1 2.3 0l6.7 4h0zM12 8v4M12 16h0" />
		</svg>
	)
}
