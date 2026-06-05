export const GameModeConstants = Object.freeze({
  BINGO: 'Bingo',         // TBD
  VIEWERS: 'Viewers',     // Higher/Lower
  UPLOAD: 'Date',         // Guess the date, progressive hints
  LIKES: 'Likes',         // Higher/Lower
  CHANNEL: "Channel",     // Guess channel characteristics from picture (use channels from video search)
  THUMBNAIL: 'Thumbnail', // Guess the thumbnail based on the video title
})

export type GameMode =
  | 'Bingo'
  | 'Viewers'
  | 'Date'
  | 'Likes'
  | 'Channel'
  | 'Thumbnail';