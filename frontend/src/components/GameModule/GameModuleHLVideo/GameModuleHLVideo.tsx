import { GameMode, GameModeConstants } from "@/constants/game";
import { OtherConstants } from "@/constants/other";
import { PROGRESS_TEXT_COLORS, ProgressConstants } from "@/constants/progresscircle";
import { Video } from "@/constants/video"
import { formatDate, getCategory } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { CircleUserRoundIcon } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { TagIcon } from "lucide-react";
import './GameModuleHLVideo.css'

interface GameModuleHLVideoProps {
  video: Video;
  gameMode: GameMode;
  showOverlay: boolean | null;
}

const GameModuleHLVideo = ({ video, gameMode, showOverlay }: GameModuleHLVideoProps) => {
  const guess = useAppSelector((state) => state.game_persist.guess);
  const target = useAppSelector((state) => state.game_persist.target);
  const correctString = guess.correct ? ProgressConstants.CORRECT : ProgressConstants.INCORRECT;
  const textColor = PROGRESS_TEXT_COLORS[correctString];

  const getTargetString = (target: number) => {
    switch (gameMode) {
      case GameModeConstants.VIEWERS:
        return `${target.toLocaleString(OtherConstants.LOCALE)} views`
      case GameModeConstants.LIKES:
        return `${target.toLocaleString(OtherConstants.LOCALE)} likes`
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-center m-4 mb-2 w-full items-center">
      <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${video?.videoId}`}
          title={video?.videoId}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        {(showOverlay !== null) && (
          <div className="absolute w-full h-full transparent">
            <div className={`absolute inset-0 flex items-center justify-center bg-black/60
            align-center h-1/3 top-3/9 ${showOverlay ? "overlayFadeIn" : "overlayFadeOut"}`}>
              <span className={`text-6xl font-bold flex flex-col`}>
                <span className={`${textColor}`}>{guess.correct ? "Correct!" : "Incorrect"}</span>
                <span className="text-2xl">Actual:{" "}
                  <span className="font-normal">
                    {getTargetString(target)}
                  </span>
                </span>
              </span>
            </div>
          </div>
        )}

      </div>
      <div className="flex flex-row gap-4">
        <span className="flex flex-row gap-1"><CircleUserRoundIcon className="opacity-75 mt-0.75" size={20} />{video?.channelTitle}</span>
        <span className="flex flex-row gap-1"><CalendarIcon className="opacity-75 mt-0.75" size={20} />
          {formatDate(video?.publishedAt)}
        </span>
        <span className="flex flex-row gap-1"><TagIcon className="opacity-75 mt-0.75" size={20} />{getCategory(video?.category)}</span>
      </div>
    </div>
  )
}

export default GameModuleHLVideo