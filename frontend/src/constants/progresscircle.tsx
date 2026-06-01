export const ProgressConstants = Object.freeze({
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  UNFINISHED: 'unfinished'
})

export const ProgressColors = Object.freeze({
  correct: 'bg-green-500 border-gray-400',
  incorrect: 'bg-red-500 border-gray-400',
  unfinished: 'bg-transparent border-gray-400'
})

export type ProgressState =
  | 'correct'
  | 'incorrect'
  | 'unfinished';