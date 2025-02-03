import React from 'react'
import Image from 'next/image'

interface YTiconProps {
  width?: number,
  height?: number
}

const YTicon = ({ width = 50, height = 50}: YTiconProps) => {
  return (
    <Image src='/yt_logo.svg' alt="yt_icon" width={width} height={height}/>
  )
}

export default YTicon;