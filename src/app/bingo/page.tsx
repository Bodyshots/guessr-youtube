"use client";

import './bingo.css';
import BingoMenu from "@/components/Bingomenu/bingomenu";

export default function Bingo() {
  return (
    <div className="bingo_page_container">
      <span className="text-4xl font-medium">Guessr - Bingo</span>
      <BingoMenu/>
    </div>
  );
}
