import React from 'react'
import Image from 'next/image'

interface YTiconProps {
  width?: number,
  height?: number,
  className?: string
}

const YTicon = ({ width = 50, height = 50, className}: YTiconProps) => {
  return (
    <Image src='/yt_logo.svg' alt="yt_icon" width={width} height={height} className={className}/>
  )
}

export default YTicon;