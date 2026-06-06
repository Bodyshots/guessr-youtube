"use client"

import { ProgressCircle } from '@/components/ProgressCircle/progresscircle';
import { useAppSelector } from '@/redux/store';
import { GameModuleResultsCopyBtn } from './GameModuleResultsCopyBtn/GameModuleResultsCopyBtn';
interface GameProgressProps {
  copyBtn: boolean;
}

export const GameProgress = ({ copyBtn }: GameProgressProps) => {
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);

  return (
    <div className='flex flex-row justify-center'>
      {copyBtn &&
        <GameModuleResultsCopyBtn
          gameNum={1}
          siteName={"Guessr.yt"}
          url={"siteUrl"}
        />}
      <div className="flex gap-2 justify-center">
        {progressCircles.map((state, index) => (
          <ProgressCircle
            key={index}
            progressColor={state.circleColor}
          />
        ))}
      </div>
    </div>
  );
};
