export enum GAME_MODES {
  BINGO = 'Bingo',
  VIEWERS = 'Viewers',
  UPLOAD = 'Date',
  LIKES = 'Likes',
  CHANNEL = 'Channel',
  THUMBNAIL = 'Thumbnail'
}

export type GameMode =
  'Bingo'
  | 'Viewers'
  | 'Date'
  | 'Likes'
  | 'Channel'
  | 'Thumbnail'

export type Token =
  | 'refresh'
  | 'access'
  | 'consent'
