"use client";

import { useState } from "react";
import { ProgressCircle } from "@/components/ProgressCircle/progresscircle";
import { useAppSelector } from "@/redux/store";
import { GameModuleHLResultsCopyBtn } from "./GameModuleHLResultsCopyBtn/GameModuleHLResultsCopyBtn";
import GameModuleHLVideoDetails from "./GameModuleHLVideoDetails/GameModuleHLVideoDetails";

interface GameModuleHLProgressProps {
  copyBtn: boolean;
  interactable: boolean;
  gameMode?: string;
}

export const GameModuleHLProgress = ({ copyBtn, interactable, gameMode }: GameModuleHLProgressProps) => {
  const progressCircles = useAppSelector(
    (state) => state.game_persist.progressCircles
  );

  const videos = useAppSelector((state) => state.game_persist.videos);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedCircle =
    selectedIndex !== null ? progressCircles[selectedIndex] : null;

  const selectedVideo =
    selectedIndex !== null ? videos[selectedIndex] : null;

  const handleSetSelectedIndex = (index: number) => {
    selectedIndex !== index
      ? setSelectedIndex(index)
      : setSelectedIndex(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-row justify-center items-center gap-2 mb-2">
        {copyBtn && (
          <GameModuleHLResultsCopyBtn
            gameNum={1}
            siteName={"Guessr.yt"}
            url={"siteUrl"}
          />
        )}

        <div className="flex gap-2 justify-center">
          {progressCircles.map((state, index) => (
            <ProgressCircle
              key={index}
              progressColor={state.circleColor}
              interactable={interactable}
              selected={selectedIndex === index}
              onClick={() => handleSetSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      {interactable && selectedVideo && (
        <GameModuleHLVideoDetails
          selectedIndex={selectedIndex}
          selectedCircle={selectedCircle}
          selectedVideo={selectedVideo}
          gameMode={gameMode}
        />
      )}
    </div>
  );
};