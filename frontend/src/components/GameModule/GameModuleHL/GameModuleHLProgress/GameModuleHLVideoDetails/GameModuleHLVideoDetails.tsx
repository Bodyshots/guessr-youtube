import { Separator } from "@/components/ui/separator";
import { GameModeConstants } from "@/constants/game";
import { OtherConstants } from "@/constants/other";
import { ProgressCircle } from "@/constants/progresscircle";
import { Video } from "@/constants/video";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

interface GameModuleHLVideoDetailsProps {
  selectedIndex?: number | null;
  selectedCircle?: ProgressCircle | null;
  selectedVideo?: Video | null;
  gameMode?: string;
}

const GameModuleHLVideoDetails = ({ selectedIndex, selectedCircle, selectedVideo, gameMode }: GameModuleHLVideoDetailsProps) => {
  const [showDescription, setShowDescription] = useState(false);

  const getGuess = () => {
    const userGuess = selectedCircle?.guess;

    switch (gameMode) {
      case GameModeConstants.VIEWERS:
        if (userGuess != null && (typeof (userGuess) === "number")) {
          if (selectedVideo?.viewCount && (userGuess >= selectedVideo.viewCount)) {
            return "Higher"
          }
          return "Lower"
        }
      case GameModeConstants.LIKES:
        if (userGuess != null && (typeof (userGuess) === "number")) {
          if (selectedVideo?.likeCount && (userGuess >= selectedVideo.likeCount)) {
            return "Higher"
          }
          return "Lower"
        }
    }
  }

  const getVideoActual = () => {
    switch (gameMode) {
      case GameModeConstants.VIEWERS:
        return `${selectedVideo?.viewCount.toLocaleString(OtherConstants.LOCALE)} views`
      case GameModeConstants.LIKES:
        return `${selectedVideo?.likeCount.toLocaleString(OtherConstants.LOCALE)} likes`
      case GameModeConstants.UPLOAD:
        return `${formatDate(selectedVideo?.publishedAt)}`
    }
  }


  return (
    <div
      className={`w-full border p-4 flex flex-col items-center py-2 rounded-lg border-l-4 ${selectedCircle?.highlightColor}`}
    >
      <div className="text-2xl font-bold py-2">
        Guess #{selectedIndex! + 1}
      </div>

      <div className="flex justify-center m-2 w-full">
        <iframe
          className="aspect-video"
          src={`https://www.youtube.com/embed/${selectedVideo?.videoId}`}
          title={selectedVideo?.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="details py-2 pt-1 justify-start w-full flex flex-col">
        <div className="guessDetails flex flex-row text-start w-full justify-between">
          <div className="flex flex-col">
            <span className="font-semibold">
              Your Guess:{" "}
              <span className="font-normal">
                {getGuess()}
              </span>
            </span>

            <span className="font-semibold">
              Community Average:{" "}
              <span className="font-normal">XX%</span>
            </span>
          </div>

          <div className="flex text-right flex-col justify-end">
            <span className="font-semibold">
              Actual:{" "}
              <span className="font-normal">
                {getVideoActual()}
              </span>
            </span>

            <span className="font-semibold">
              Published:{" "}
              <span className="font-normal">
                {formatDate(selectedVideo?.publishedAt)}
              </span>
            </span>
          </div>
        </div>

        <Separator orientation="horizontal" className="m-2" />

        <div className="videoDetails text-left">
          <div className="font-semibold flex flex-col">
            <span>
              Title:{" "}
              <span className="font-normal">
                {selectedVideo?.title}
              </span>
            </span>

            <span>
              By:{" "}
              <span className="font-normal">
                {selectedVideo?.channelTitle}
              </span>
            </span>

            <span
              className="cursor-pointer text-blue-500 hover:underline w-fit"
              onClick={() => setShowDescription((prev) => !prev)}
            >
              {showDescription ? "Click to minimize" : "More details..."}
            </span>
          </div>
        </div>

        {showDescription && selectedVideo?.description && (
          <div className="mt-3 w-full border rounded-md p-3 bg-muted/30 text-left">
            <div className="font-semibold mb-1">Description</div>
            <div className="text-sm whitespace-pre-wrap">
              {selectedVideo?.description}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameModuleHLVideoDetails