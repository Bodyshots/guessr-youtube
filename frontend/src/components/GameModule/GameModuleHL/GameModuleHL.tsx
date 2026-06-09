"use client"

import { Video } from "@/constants/video";
import { GameModuleHLProgress } from "./GameModuleHLProgress/GameModuleHLProgress"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameModuleHLAnswers from "./GameModuleHLAnswers/GameModuleAnswers";
import { processGuess, setGameEndTime, resetGame } from "@/redux/slices/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import GameModuleHLResults from "./GameModuleHLResults/GameModuleHLResults";
import { formatStatsTime } from "@/lib/utils";
import GameModuleHLVideo from "../GameModuleHLVideo/GameModuleHLVideo";
import { GameMode } from "@/constants/game";
import { ClipLoader } from "react-spinners";
import { OtherConstants } from "@/constants/other";

interface GameModuleHLProps {
  videos: Video[];
  gameMode: GameMode;
}

const GameModuleHL = ({ videos, gameMode }: GameModuleHLProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isEval, setIsEval] = useState<boolean | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean | null>(null);

  const currIndex = useAppSelector((state) => state.game_persist.currIndex);
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);
  const gameStartTime = useAppSelector((state) => state.game_persist.gameStartTime);
  const gameEndTime = useAppSelector((state) => state.game_persist.gameEndTime);
  const theme = useAppSelector((state) => state.game_persist.theme);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const currTime = (gameEndTime ? gameEndTime : 0) - (gameStartTime ? gameStartTime : 0);

  // Set initial states based on whether new data has been entered
  useEffect(() => {
    const videoTheme = videos[0].theme;

    if (progressCircles.length === 0 || theme != videoTheme) {
      dispatch(resetGame({ videos: videos, newTheme: videos[0].theme }))
    }

    const t = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(t);
  }, [dispatch, progressCircles.length, videos, currIndex, theme])

  // Check if game is finished
  useEffect(() => {
    if (currIndex >= videos.length && progressCircles.length > 0 && !gameEndTime) {
      dispatch(setGameEndTime(Date.now()))
    }
  }, [dispatch, currIndex, progressCircles.length, gameEndTime, videos.length])

  const handleProcessGuess = (userAnswer: number) => {
    if (isEval) return;

    setIsEval(true);

    dispatch(processGuess({
      gameMode: gameMode,
      userAnswer: userAnswer
    }))

    setShowOverlay(true);

    setTimeout(() => {
      setIsEval(false);
      setShowOverlay(false);
    }, OtherConstants.ANSWER_STAY_DURATION);
  }

  // TODO: May add to slice
  const timeTaken = formatStatsTime(currTime);
  const avgTimePerGuess = formatStatsTime((currTime) / videos.length);

  if (!isMounted) {
    return (
      <div className="flex flex-col flex-nowrap w-full align-center justify-center p-20">
        <div className="p-14 flex flex-col items-center gap-8">
          <ClipLoader size={100} color="white" />
          <span className="text-xl">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {!gameEndTime ? (
        <>
          <GameModuleHLVideo
            video={videos[currIndex]}
            gameMode={gameMode}
            showOverlay={showOverlay}
          />

          <div className="videoFooter flex flex-col m-4">
            <GameModuleHLProgress
              copyBtn={false}
              interactable={false}
            />
            <GameModuleHLAnswers
              handleProcessGuess={(userAnswer) => handleProcessGuess(userAnswer)}
              disabled={isEval ? true : false}
            />
          </div>
        </>
      ) : (
        <GameModuleHLResults
          onDone={() => router.push('/')}
          timeTaken={timeTaken}
          avgTimePerGuess={avgTimePerGuess}
          gameMode={gameMode}
        />
      )}
    </div>
  )
}

export default GameModuleHL