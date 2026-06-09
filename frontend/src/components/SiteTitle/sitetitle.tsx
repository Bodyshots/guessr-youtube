"use client"

import YTicon from "../YTIcon/yticon";
import './sitetitle.css';
import { useEffect, useState } from 'react';
import { OtherConstants } from "@/constants/other";
import { ClipLoader } from "react-spinners";
import SiteTitleSubtitle from "./SiteTitleSubtitle/SiteTitleSubtitle";

export default function SiteTitle() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(t);
  }, [])

  if (!isMounted) return (
    <>
      <div className="hero-section flex flex-col flex-nowrap w-full align-center justify-center 
        lg:h-1/5 md:h-1/3 rounded-xl shadow-md shadow-black dark:shadow-white max-sm:hidden">
        <div className="hero-content p-10">
          <ClipLoader size={60} color="white" />
        </div>
      </div>
      <div className="justify-center max-sm:block hidden">
        <ClipLoader size={60} color="foreground" />
      </div>
    </>
  );

  return (
    <>
      {/* Small/Mobile screens */}
      <div className="flex-col gap-4 max-sm:block hidden font-logo">
        <div className="flex flex-row gap-4 justify-center align-center">
          <YTicon width={80} className="max-[385px]:hidden" />
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
        <SiteTitleSubtitle
          mobile={true}
        />
      </div>
      {/* Desktop screens */}
      <div className="hero-section flex flex-col flex-nowrap w-full align-center justify-center 
                        lg:h-2/10 md:h-1/3 rounded-xl shadow-md shadow-black dark:shadow-white max-sm:hidden">
        <div className="hero-content p-4">
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
              <SiteTitleSubtitle
                mobile={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}