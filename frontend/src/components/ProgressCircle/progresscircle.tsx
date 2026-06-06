import { ProgressCircleColor } from "@/constants/progresscircle";


interface ProgressCircleProps {
  progressColor: ProgressCircleColor;
}

export const ProgressCircle = ({ progressColor }: ProgressCircleProps) => {
  return (
    <div
      className={`
        w-9 h-9
        rounded-full
        ${progressColor}
        shrink-0
      `}
    />
  );
};
