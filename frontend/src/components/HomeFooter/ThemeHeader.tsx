"use client"

import { useEffect, useState } from 'react'
import { capitalizeString, getTimeUntilTheme } from '@/lib/utils'

interface ThemeHeaderProps {
  theme: string;
}

const ThemeHeader = ({ theme }: ThemeHeaderProps) => {

  const [timeUntilTheme, setTimeUntilTheme] = useState<string>('')

  useEffect(() => {
    const calcTimeUntilTheme = () => setTimeUntilTheme(getTimeUntilTheme())

    calcTimeUntilTheme();
    const interval = setInterval(calcTimeUntilTheme, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex m-6 flex-col relative align-bottom justify-end gap-1'>
      <div className='text-4xl flex flex-col gap-2'>
        <span>Today&apos;s theme: <span className="font-semibold">{capitalizeString(theme)}</span></span>
      </div>
      <span className='text-lg'>
        Next theme in: {timeUntilTheme}
      </span>
    </div>
  )
}

export default ThemeHeader