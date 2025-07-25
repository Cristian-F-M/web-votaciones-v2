import Clock from '@/icons/Clock'
import { SingleTimeCard } from '../SingleTimeCard'
import { useRemainingTime } from '@/hooks/useRemainingTime'

export function CountDown({ targetDate }: { targetDate: Date }) {
	const { remainingTime } = useRemainingTime(targetDate)

	return (
		<div className="remaining-time w-10/12 mx-auto mt-7">
			<h3 className="flex flex-row gap-1 items-center w-fit mx-auto md:text-xl text-sm">
				<Clock className="text-(--color) size-6" /> Tiempo restante para votar
			</h3>
			<div className="mx-auto w-fit mt-2 flex flex-row gap-1 items-center justify-center border dark:border-(--color)/50 border-(--color) md:px-14 px-5 py-4 rounded">
				<SingleTimeCard label="días" value={remainingTime.days} />
				<span className="time-separator">:</span>
				<SingleTimeCard label="horas" value={remainingTime.hours} />
				<span className="time-separator">:</span>
				<SingleTimeCard label="min" value={remainingTime.minutes} />
				<span className="time-separator">:</span>
				<SingleTimeCard label="seg" value={remainingTime.seconds} />
			</div>
		</div>
	)
}
