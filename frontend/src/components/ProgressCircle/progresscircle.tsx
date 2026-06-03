import { ProgressColor } from "@/constants/progresscircle";


interface ProgressCircleProps {
  progressColor: ProgressColor;
}

export const ProgressCircle = ({ progressColor }: ProgressCircleProps) => {
  return (
    <div
      className={`
        w-9 h-9
        rounded-full border-2
        ${progressColor}
        shrink-0
      `}
    />
  );
};
