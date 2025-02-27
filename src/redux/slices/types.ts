import { ClipType } from "@/constants/clips";
import { ModeType } from "@/constants/modes";
import { VideoType } from "@/constants/videotypes";

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
    video: VideoType;
    clips: ClipType;
    mode: ModeType;
    timer: string;
}