'use client'

import { useState, useEffect, useCallback } from 'react'

const formatTime = (time: number) => String(time).padStart(2, '0')

const CountdownTimer = ({ expiryTimestamp }: { expiryTimestamp: string }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(expiryTimestamp) - +new Date()
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }, [expiryTimestamp])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  return (
    <div className="inline-block bg-white/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg shadow-md text-sm md:text-base">
      <span className="font-mono tracking-wider">
        {formatTime(timeLeft.hours)}
      </span>
      <span className="animate-pulse">:</span>
      <span className="font-mono tracking-wider">
        {formatTime(timeLeft.minutes)}
      </span>
      <span className="animate-pulse">:</span>
      <span className="font-mono tracking-wider">
        {formatTime(timeLeft.seconds)}
      </span>
    </div>
  )
}

export default CountdownTimer
