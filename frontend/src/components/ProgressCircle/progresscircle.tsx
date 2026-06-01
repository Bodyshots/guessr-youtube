import { ProgressState, ProgressColors } from '@/constants/progresscircle';

interface ProgressCircleProps {
  progressState: ProgressState;
  index: number;
}

export const ProgressCircle = ({ progressState, index }: ProgressCircleProps) => {
  return (
    <div
      className={`
        w-9 h-9
        rounded-full border-2
        ${ProgressColors[progressState]}
        shrink-0
      `}
    />
  );
};
