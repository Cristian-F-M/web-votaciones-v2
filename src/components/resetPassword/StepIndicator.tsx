import { useCallback } from 'react'
import { SingleStep } from './SingleStep'
import '@/styles/stepIndicator.css'

export function StepIndicator({
	steps,
	currentStep
}: {
	steps: string[]
	currentStep: number
}) {
	const cantSteps = steps.length
	const value = 100 / cantSteps

	const getMiddlePercent = useCallback(
		(cantSteps: number, currentStep: number) => {
			if (cantSteps < 2) return 0
			const percent = ((2 * currentStep + 1) * 50) / (cantSteps - 1)
			return Math.min(percent, 100)
		},
		[]
	)

	const lineIndicatorWidth = getMiddlePercent(cantSteps, currentStep)

	return (
		<div className="relative z-2 mb-4">
			<div
				className={`flex items-center gap-2 w-full mx-auto ${cantSteps > 1 ? 'justify-between' : 'justify-center'}`}
			>
				{cantSteps > 1 && (
					<div className="step--line w-11/12 h-1 rounded bg-gray-400/60 absolute left-1/2 top-2/4 -translate-1/2 -z-1 dark:bg-gray-300/60">
						<div
							className="h-full bg-(--color) transition-all duration-400 rounded"
							style={{ width: `${lineIndicatorWidth}%` }}
						/>
					</div>
				)}
				{steps.map((text, index) => (
					<SingleStep
						// biome-ignore lint/suspicious/noArrayIndexKey: Just beacuse
						key={index}
						step={index}
						text={text}
						currentStep={currentStep}
					/>
				))}
			</div>
		</div>
	)
}
