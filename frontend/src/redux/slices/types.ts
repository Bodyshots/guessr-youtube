import { ProgressCircle } from "@/constants/progresscircle";
import { Video } from "@/constants/video";

export interface PrivacyState {
  privacy_ack: boolean;
}

export type BingoCell = {
  square_desc: string;
  marked: boolean;
}

export interface BingoState {
  width: number;
  board: BingoCell[][] | null;
}

export interface GameState {
  theme: string;
  currIndex: number;
  target: number;
  targetDate: Date;
  guess: number | Date | null;
  progressCircles: ProgressCircle[];
  videos: Video[];
  gameStartTime: number | null | undefined;
  gameEndTime: number | null | undefined;
  showResults: boolean | null | undefined;
}