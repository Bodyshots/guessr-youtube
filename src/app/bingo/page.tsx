"use client";

import BingoCard from '@/components/BingoCard/bingocard';
import './bingo.css';
import BingoMenu from "@/components/Bingomenu/bingomenu";

export default function Bingo() {
  return (
    <div className="bingo_page_container">
      <BingoCard/>
      <span className="text-4xl font-medium">Guessr - Bingo</span>
      <BingoMenu/>
    </div>
  );
}
