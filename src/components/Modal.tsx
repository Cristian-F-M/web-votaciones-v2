import X from '@/icons/X'
import { useCallback, useEffect, useRef } from 'react'

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
	triggerRef: React.RefObject<HTMLElement | null>
}

export function Modal({
	children,
	triggerRef,
	className,
	...props
}: ModalProps) {
	const modalRef = useRef<HTMLDialogElement>(null)

	const handleCloseModal = useCallback(() => {
		modalRef.current?.close()
	}, [])

	const handleOpenModal = useCallback(() => {
		modalRef.current?.showModal()
	}, [])

	useEffect(() => {
		const current = triggerRef.current
		if (!current) return

		current.addEventListener('click', handleOpenModal)

		return () => {
			current.removeEventListener('click', handleOpenModal)
		}
	}, [triggerRef, handleOpenModal])

	return (
		<>
			<dialog
				className="bg-page-contrast outline-none m-auto p-6 rounded py-10 hidden opacity-0 translate-y-4  transition-all border border-gray-300 shadow-2xl dark:border-gray-700/50 starting:opacity-0 starting:translate-y-4 transition-discrete open:block open:opacity-100 open:translate-y-0 open:starting:opacity-0 open:starting:translate-y-10 dark:backdrop:bg-gray-950/50 backdrop:bg-gray-900/40 backdrop:backdrop-blur backdrop:transition-all duration-200 w-11/12 max-w-[450px]"
				ref={modalRef}
				{...props}
			>
				<button
					type="button"
					onClick={handleCloseModal}
					className="absolute top-2 right-2 w-fit cursor-pointer text-gray-600 hover:bg-gray-200 rounded p-0.5 transition-colors outline-none [&_svg]:size-5 dark:text-gray-400 dark:hover:bg-gray-700"
				>
					<X />
				</button>

				{children}
			</dialog>
		</>
	)
}
