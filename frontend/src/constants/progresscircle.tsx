export const ProgressConstants = Object.freeze({
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  UNFINISHED: 'unfinished',
} as const);

export const PROGRESS_CIRCLE_COLORS = {
  [ProgressConstants.CORRECT]: 'bg-green-500 border-gray-400',
  [ProgressConstants.INCORRECT]: 'bg-red-500 border-gray-400',
  [ProgressConstants.UNFINISHED]: 'bg-transparent border-gray-400',
} as const;

export const PROGRESS_HIGHLIGHT_COLORS = {
  [ProgressConstants.CORRECT]: 'bg-green-500/10 border-l-green-500',
  [ProgressConstants.INCORRECT]: 'bg-red-500/10 border-l-red-500',
  [ProgressConstants.UNFINISHED]: 'bg-transparent',
} as const;

export const PROGRESS_TEXT_COLORS = {
  [ProgressConstants.CORRECT]: 'text-green-600',
  [ProgressConstants.INCORRECT]: 'text-red-600',
  [ProgressConstants.UNFINISHED]: '',
} as const;

export type ProgressStatus =
  typeof ProgressConstants[keyof typeof ProgressConstants];

export type ProgressCircleColor =
  typeof PROGRESS_CIRCLE_COLORS[keyof typeof PROGRESS_CIRCLE_COLORS];

export type ProgressHighlightColor =
  typeof PROGRESS_HIGHLIGHT_COLORS[keyof typeof PROGRESS_HIGHLIGHT_COLORS];

export type ProgressTextColor =
  typeof PROGRESS_TEXT_COLORS[keyof typeof PROGRESS_TEXT_COLORS];

export interface ProgressCircle {
  status: ProgressStatus;
  circleColor: ProgressCircleColor;
  highlightColor: ProgressHighlightColor;
  textColor: ProgressTextColor;
  guess: number | Date | null;
}