import React from 'react';
import Image from 'next/image';

interface YTiconProps {
  width?: number;
  className?: string;
}

const YTicon = ({ width = 50, className }: YTiconProps) => {
  return (
    <Image
      src="/yt_logo.svg"
      alt="yt_icon"
      width={0}
      height={0}
      className={className}
      style={{ width, height: 'auto' }}
    />
  );
};

export default YTicon;
