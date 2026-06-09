import { ProgressCircleColor } from "@/constants/progresscircle";

interface ProgressCircleProps {
  progressColor: ProgressCircleColor;
  interactable: boolean;
  selected: boolean;
  onClick?: () => void;
}

export const ProgressCircle = ({ progressColor, selected, interactable, onClick }: ProgressCircleProps) => {

  return ((interactable && onClick) ?
    <div
      className={`
        w-9 h-9 border
        rounded-full
        ${progressColor}
        shrink-0
        fade-in
        transition-all
        cursor-pointer
        hover:opacity-50
        duration-150
        ${selected ? "ring-1 scale-105" : "opacity-80"}
      `}
      onClick={onClick}
    />
    :
    <div
      className={`
        w-9 h-9 border
        rounded-full
        ${progressColor}
        shrink-0
        fade-in
        transition-colors
      `}
    />
  );
};
