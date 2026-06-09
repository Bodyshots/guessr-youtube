"use client";

import { TAGLINES } from "@/constants/taglines";
import { useState } from "react";
import "./sitetitlesubtitle.css";
import { OtherConstants } from "@/constants/other";

interface SiteTitleSubtitleProps {
  mobile: boolean;
}

const getRandomTaglineIndex = () => {
  return Math.floor(Math.random() * TAGLINES.length)
}

const SiteTitleSubtitle = ({ mobile }: SiteTitleSubtitleProps) => {

  const [tagline, setTagline] = useState(TAGLINES[getRandomTaglineIndex()]);
  const [previousTagline, setPreviousTagline] = useState<string | null>(null);
  const [showPrevious, setShowPrevious] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleOnClick = () => {
    // Set previous tagline to fade out
    setPreviousTagline(tagline);
    setShowPrevious(true);

    // Get new tagline
    const newTagline = TAGLINES[getRandomTaglineIndex()];
    setTagline(newTagline);
    setAnimationKey(prev => prev + 1);

    // Clear previous tagline after animation completes
    setTimeout(() => {
      setShowPrevious(false);
    }, OtherConstants.SUBTITLE_FADE_DURATION);
  }

  return (
    <div className="relative inline-block">
      {showPrevious && previousTagline && (
        <span
          className={`subtitle-fade-out ${mobile
            ? `font-yt_font font-semibold text-muted-foreground/90 pt-1`
            : `font-yt_font font-semibold text-white/90 pt-2`}`}>
          {previousTagline}
        </span>
      )}
      <span
        key={animationKey}
        onClick={handleOnClick}
        className={`subtitle-fade-in ${mobile
          ? `font-yt_font font-semibold text-muted-foreground/90 pt-1 cursor-pointer`
          : `font-yt_font font-semibold text-white/90 pt-2 subtitle cursor-pointer`}`}>
        {tagline}
      </span>
    </div>
  )
}

export default SiteTitleSubtitle