import type { Candidate } from '@/types/models'
const API_URL = process.env.NEXT_PUBLIC_API_URL

export function CandidateCard({ candidate }: { candidate: Candidate }) {
	const imageUrl = candidate.imageUrl?.startsWith('http')
		? candidate.imageUrl
		: `${API_URL}/candidate/image/${candidate.imageUrl}`

	return (
		<div className="w-[260px] h-[380px] border border-gray-400/60 rounded shadow">
			<div className="w-11/12 h-auto mx-auto border-b border-gray-300">
				<img alt={`Foto del candidate ${candidate.user.name}`} src={imageUrl} />
			</div>

			<div className="py-2 px-4">
				<div className="w-fit mx-auto flex flex-col items-center mb-4">
					<h4 className="text-2xl">{candidate.user.name}</h4>
					<p className="text-xs text-gray-700 dark:text-gray-400 text-center">Esta es una descripción del candidato</p>
				</div>

				<button type='button' onClick={() => alert(`Votar por ${candidate.user.name}`)} className="bg-(--color) w-full px-3 py-1.5 rounded cursor-pointer hover:bg-(--color)/70 transition-colors">Votar</button>
			</div>
		</div>
	)
}
