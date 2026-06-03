"use client"

import { ProgressCircle } from '@/components/ProgressCircle/progresscircle';
import { useAppSelector } from '@/redux/store';

export const GameProgress = () => {
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);

  return (
    <div className="flex gap-2 justify-center">
      {progressCircles.map((state, index) => (
        <ProgressCircle
          key={index}
          progressColor={state.circleColor}
        />
      ))}
    </div>
  );
};
