export const GameModeConstants = Object.freeze({
  BINGO: 'Bingo',
  VIEWERS: 'Viewers',
  UPLOAD: 'Date',
  LIKES: 'Likes',
  GENRE: 'Genre'
})

export type GameMode =
  | 'Bingo'
  | 'Viewers'
  | 'Date'
  | 'Likes'
  | 'Genre';
