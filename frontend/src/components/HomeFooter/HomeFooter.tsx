"use client"

import { useEffect, useState } from 'react'
import { getTimeUntilTheme } from '@/lib/utils'

const HomeFooter = () => {

  const [timeUntilTheme, setTimeUntilTheme] = useState<string>('')

  useEffect(() => {
    const calcTimeUntilTheme = () => setTimeUntilTheme(getTimeUntilTheme())

    calcTimeUntilTheme();
    const interval = setInterval(calcTimeUntilTheme, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='mt-6'>
      Next theme in: {timeUntilTheme}
    </div>
  )
}

export default HomeFooter