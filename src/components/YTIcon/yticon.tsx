import React from 'react'
import Image from 'next/image'

interface YTiconProps {
  width?: number,
}

const YTicon = ({ width = 50}: YTiconProps) => {
  return (
    <Image 
      src='/yt_logo.svg'
      alt="yt_icon"
      width="0"
      height="0"
    style={{ width: width, height: 'auto' }}/>
  )
}

export default YTicon;