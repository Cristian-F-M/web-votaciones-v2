import { SingleTimeCard } from '../SingleTimeCard'
import { useRemainingTime } from '@/hooks/useRemainingTime'
import { IconClock } from '@tabler/icons-react'
import { twMerge } from 'tailwind-merge'

interface CountDownProps extends React.HTMLAttributes<HTMLDivElement> {
	targetDate: Date | string | null
}

export function CountDown({ targetDate, className, ...props }: CountDownProps) {
	const { remainingTime } = useRemainingTime(targetDate)

	return (
		<div className={twMerge('w-full md:w-10/12 mx-auto', className)} {...props}>
			<div className="mx-auto w-fit mt-2 flex flex-wrap md:flex-row gap-3 items-center justify-center md:px-6 px-0 py-6 rounded">
				<SingleTimeCard label="días" value={remainingTime.days} />
				<SingleTimeCard label="horas" value={remainingTime.hours} />
				<SingleTimeCard label="minutos" value={remainingTime.minutes} />
				<SingleTimeCard label="segundos" value={remainingTime.seconds} />
			</div>
		</div>
	)
}
