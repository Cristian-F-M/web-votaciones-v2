import { useCallback, useEffect, useState } from 'react'

type TargetDate = Date | string


type RemainingTime = Record<keyof typeof defaultRemainingTime, string>

interface UseRemainingTimeReturnValue {
  remainingTime: RemainingTime
}


const defaultRemainingTime = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
}

export function useRemainingTime(targetDate: TargetDate): UseRemainingTimeReturnValue {
  if (!targetDate) return { remainingTime: defaultRemainingTime }

  const [remainingTime, setRemainingTime] = useState<RemainingTime>(defaultRemainingTime)


  const calculateRamainingTime = useCallback((targetDate: TargetDate) => {
    const newTargetdate = new Date(targetDate)
    const targetTime = newTargetdate.getTime()
    const nowTime = new Date().getTime()

    const difference = targetTime - nowTime


    if (difference < 0) return

    const newRemainingTime = getRemainingTime(targetDate)
    setRemainingTime(newRemainingTime)
  }, [])


  useEffect(() => {
    calculateRamainingTime(targetDate)
    const interval = setInterval(() => calculateRamainingTime(targetDate))

    return () => clearInterval(interval)

  }, [targetDate, calculateRamainingTime])



  return { remainingTime }

}




function getRemainingTime(targetDate: Date | string) {
  const now = new Date().getTime()
  const targetTime = new Date(targetDate).getTime()
  const difference = targetTime - now

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)


  const [newDays, newHours, newMinutes, newSeconds] = [days, hours, minutes, seconds].map((v) => v.toString().padStart(2, '0'))

  return {
    days: newDays,
    hours: newHours,
    minutes: newMinutes,
    seconds: newSeconds,
  }
}
