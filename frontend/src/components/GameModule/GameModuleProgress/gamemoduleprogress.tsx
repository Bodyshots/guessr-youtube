"use client"

import { ProgressCircle } from '@/components/ProgressCircle/progresscircle';
import { ProgressState } from '@/constants/progresscircle';

interface GameProgressProps {
  progressStates: ProgressState[];
}

export const GameProgress = ({
  progressStates,
}: GameProgressProps) => {
  return (
    <div className="flex gap-2 justify-center">
      {progressStates.map((state, index) => (
        <ProgressCircle
          key={index}
          progressState={state}
          index={index}
        />
      ))}
    </div>
  );
};
