import { ClipType } from "@/constants/clips";
import { ModeType } from "@/constants/modes";
import { VideoType } from "@/constants/videotypes";

export interface AuthState {
    auth: boolean;
  }

export interface GameState {
    video: VideoType;
    clips: ClipType;
    mode: ModeType;
    timer: string;
}