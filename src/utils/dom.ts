export function scrollSmooth(element: HTMLElement | string) {
	let newElement: ReturnType<Document['querySelector']> | HTMLElement | null =
		null
	newElement =
		typeof element === 'string' ? document.querySelector(element) : element

	newElement?.scrollIntoView({
		behavior: 'smooth'
	})
}
