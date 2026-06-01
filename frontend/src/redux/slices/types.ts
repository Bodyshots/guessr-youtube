import { ProgressState } from "@/constants/progresscircle";

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
  currIndex: number;
  guess: boolean | null | undefined;
  progressStates: ProgressState[];
  gameStartTime: number | null | undefined;
  gameEndTime: number | null | undefined;
  showResults: boolean | null | undefined;
}