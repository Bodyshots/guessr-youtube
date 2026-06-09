"use client"

import { capitalizeString, getTimeUntilTheme } from '@/lib/utils'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { useRouter, usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { ChevronDownIcon } from 'lucide-react'
import { GameModeMenuItems } from '@/constants/menuitems'

interface GameModuleHeaderProps {
  currentTheme: string
}

const GameModuleHeader = ({ currentTheme }: GameModuleHeaderProps) => {
  const [timeUntilTheme, setTimeUntilTheme] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

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
          <span className='font-semibold'>{timeUntilTheme || 'Calculating...'}</span>
        </div>
      </div>
      <div className="titleHeader flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 cursor-pointer outline-none">
              <span className="text-4xl font-bold font-yt_font">Guessr.yt</span>
              <ChevronDownIcon className='mt-4 ml-2' size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {GameModeMenuItems.map((mode, index) => {
              const Icon = mode.icon
              const isActive = pathname === mode.url || (pathname.startsWith(mode.url) && mode.url !== '/')
              return (
                <div key={mode.url}>
                  <DropdownMenuItem
                    onClick={() => router.push(mode.url)}
                    data-active={isActive}
                    className="flex items-center gap-2 p-2 my-1 data-[state=open]:hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium cursor-pointer rounded-md outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Icon size={18} />
                    <span>{mode.title}</span>
                  </DropdownMenuItem>
                  {index === 0 && <Separator />}
                </div>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-left">Viewers</span>
      </div>
      <div className="currThemeSection flex flex-col items-end text-right">
        <span>Current theme:</span>
        <span className='font-semibold'>{capitalizeString(currentTheme)}</span>
      </div>
    </div >
  )
}

export default GameModuleHeader