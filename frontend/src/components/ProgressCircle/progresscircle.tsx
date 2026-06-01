import { ProgressState, ProgressColors } from '@/constants/progresscircle';

interface ProgressCircleProps {
  progressState: ProgressState;
  index: number;
}

export const ProgressCircle = ({ progressState, index }: ProgressCircleProps) => {
<<<<<<< HEAD
  return (
    <div
      className={`
        w-9 h-9
=======

  return (
    <div
      className={`
        w-8 h-8
>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)
        rounded-full border-2
        ${ProgressColors[progressState]}
        shrink-0
      `}
    />
  );
};
