"use client"

import YTicon from "../YTIcon/yticon";
import './sitetitle.css';
import { useEffect, useState } from 'react';
import { OtherConstants } from "@/constants/other";
import { ClipLoader } from "react-spinners";

export default function SiteTitle() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) return (
    <>
      <div className="hero-section flex flex-col flex-nowrap w-full align-center justify-center 
        lg:h-2/6 md:h-1/3 rounded-xl shadow-md shadow-black dark:shadow-white max-sm:hidden">
        <div className="hero-content p-10">
          <ClipLoader size={145} color="white"/>
        </div>
      </div>
      <div className="justify-center max-sm:block hidden">
        <ClipLoader size={100} color="foreground"/>
      </div>
    </>
  );

  return (
    <>
      {/* Small/Mobile screens */}
      <div className="flex-col gap-4 max-sm:block hidden font-logo">
        <div className="flex flex-row gap-4 justify-center align-center">
          <YTicon width={80} className="max-[375px]:hidden" />
            <span className={`pt-2 inline-block text-5xl`}>
              {OtherConstants.SITETITLE.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block title-letter"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
        </div>
          <span className="font-yt_font font-semibold text-muted-foreground/90 subtitle pt-2">
            Click one of the buttons below to prepare a game!<br/>
            Alternatively, hover over a button to see a game mode in more detail.
          </span>
      </div>
      {/* Desktop screens */}
      <div className="hero-section flex flex-col flex-nowrap w-full align-center justify-center 
                        lg:h-2/6 md:h-1/3 rounded-xl shadow-md shadow-black dark:shadow-white max-sm:hidden">
        <div className="hero-content p-10">
          <div 
          className={`flex flex-row gap-x-3 text-center justify-center font-logo pb-2`}>
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 justify-center align-center">
                <YTicon width={100} />
                <span className={`pt-2 inline-block text-7xl`}>
                  {OtherConstants.SITETITLE.split("").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block title-letter"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>
              <span className="font-yt_font font-semibold text-white/90 pt-4 subtitle">
                Click one of the buttons below to prepare a game!<br/>
                Alternatively, hover over a button to see a game mode in more detail.
              </span>
              {/* <span className="font-yt_font font-semibold text-muted-foreground/90">
                  Click one of the buttons below to prepare a game!<br/>
                  Alternatively, hover over a button to see a description of the game mode.
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}