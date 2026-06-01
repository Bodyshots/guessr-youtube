import { ProgressState, ProgressColors } from '@/constants/progresscircle';

interface ProgressCircleProps {
  progressState: ProgressState;
  index: number;
}

export const ProgressCircle = ({ progressState, index }: ProgressCircleProps) => {

  return (
    <div
      className={`
        w-8 h-8
        rounded-full border-2
        ${ProgressColors[progressState]}
        shrink-0
      `}
    />
  );
};
