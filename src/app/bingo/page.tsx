"use client";

import './bingo.css';
import BingoMenu from "@/components/Bingomenu/bingomenu";

export default function Bingo() {
  return (
    <div className="flex w-full align-center text-center flex-col flex-nowrap m-auto justify-between h-full p-4">
      <span className="text-4xl font-bold font-yt_font p-4">Bingo</span>
      <BingoMenu/>
    </div>
  );
}
