export function SingleStep({
	text,
	currentStep,
	step
}: {
	text: string
	currentStep: number
	step: number
}) {
	const isActive = currentStep >= step
	const isCurrentStep = currentStep === step

	return (
		<div className="single-step flex flex-col gap-y-1 justify-center items-center px-2 bg-white">
			<div className="step--indicator relative" data-active={isActive}>
				<div className="step--circle">{step}</div>
				{isCurrentStep && (
					<>
						<div className="step--circle pulse-animation" />
						<div className="step--circle pulse-animation delay-75" />
					</>
				)}
			</div>
			<span className="step--text absolute -bottom-4.5 text-xs text-gray-600">
				{text}
			</span>
		</div>
	)
}
