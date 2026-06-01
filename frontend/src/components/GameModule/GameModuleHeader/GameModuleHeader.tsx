"use client"

import { getTimeUntilTheme } from '@/lib/utils'
import { useState, useEffect } from 'react'

const GameModuleHeader = () => {
  const [timeUntilTheme, setTimeUntilTheme] = useState<string>('')

  useEffect(() => {
    const calcTimeUntilTheme = () => setTimeUntilTheme(getTimeUntilTheme())

    calcTimeUntilTheme();
    const interval = setInterval(calcTimeUntilTheme, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mainHeader flex flex-row justify-between mx-auto items-center py-2 pad-4 max-w-166.75 w-full">
      <div className="nextInSection">
        <div className="flex flex-col items-left text-left">
          <span>Next theme in:</span>
          <span>{timeUntilTheme || 'Calculating...'}</span>
        </div>
      </div>
      <div className="titleHeader flex flex-col">
        <span className="text-4xl font-bold font-yt_font">Guessr.yt</span>
        <span className="text-left">Viewers</span>
      </div>
      <div className="currThemeSection flex flex-col items-end text-right">
        <span>Current theme:</span>
        <span>(temp theme)</span>
      </div>
    </div>
  )
}

export default GameModuleHeader