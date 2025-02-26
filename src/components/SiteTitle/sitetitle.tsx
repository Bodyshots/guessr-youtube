"use client"

import YTicon from "../YTIcon/yticon"

interface TitleProps {
  width?: number;
  height?: number;
  title_style?: string;
}

export default function SiteTitle( {width = 80, height = 80, title_style = "pt-2 text-5xl"}: TitleProps ) {

  return (<div className={`flex flex-row gap-x-3 text-center justify-center title_text font-logo pb-2`}>
            <YTicon width={width} height={height}/>
            <span className={`${title_style}`}>Guessr.yt</span>
          </div>)
}