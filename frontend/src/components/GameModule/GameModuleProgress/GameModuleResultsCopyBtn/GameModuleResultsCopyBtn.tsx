"use client";

import { useAppSelector } from "@/redux/store";
import { PROGRESS_CIRCLE_COLORS, ProgressConstants } from "@/constants/progresscircle";
import { ClipboardIcon } from "lucide-react";
import { toast } from "sonner";

interface GameModuleResultsCopyBtnProps {
  gameNum: number;
  siteName: string;
  url: string;
}

export const GameModuleResultsCopyBtn = ({
  gameNum,
  siteName,
  url,
}: GameModuleResultsCopyBtnProps) => {

  const progressCircles = useAppSelector(
    (state) => state.game_persist.progressCircles
  );

  const handleCopy = async () => {
    const scoreLine = progressCircles
      .map((circle) => {
        switch (circle.circleColor) {
          case PROGRESS_CIRCLE_COLORS[ProgressConstants.CORRECT]:
            return "🟩";
          case PROGRESS_CIRCLE_COLORS[ProgressConstants.INCORRECT]:
            return "🟥";
        }
      })
      .join("");

    const text = `${siteName}: #${gameNum} ${scoreLine}

    ${url}`;

    toast.success("Results copied to clipboard!");
    await navigator.clipboard.writeText(text);

  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-full px-2 mx-2 hover:opacity-50 transition-all duration-150"
    >
      <ClipboardIcon size={20} />
    </button>
  );
};