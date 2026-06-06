"use client"

import { Video } from "@/constants/video";
import { GameProgress } from "./GameModuleProgress/gamemoduleprogress"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GameModuleAnswers from "./GameModuleAnswers/GameModuleAnswers";
import { setGuess, processGuess, setGameEndTime, resetGame } from "@/redux/slices/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import GameModuleResults from "./GameModuleResults/GameModuleResults";
import { formatStatsTime } from "@/lib/utils";
import GameModuleVideo from "./GameModuleVideo/gamemodulevideo";
import { GameMode } from "@/constants/gamemode";

interface GameModuleProps {
  videos: Video[];
  gameMode: GameMode;
}

const GameModule = ({ videos, gameMode }: GameModuleProps) => {
  const currIndex = useAppSelector((state) => state.game_persist.currIndex);
  const guess = useAppSelector((state) => state.game_persist.guess);
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);
  const gameStartTime = useAppSelector((state) => state.game_persist.gameStartTime);
  const gameEndTime = useAppSelector((state) => state.game_persist.gameEndTime);
  const theme = useAppSelector((state) => state.game_persist.theme);

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Set initial states based on whether new data has been entered
  useEffect(() => {
    const videoTheme = videos[0].theme;

    if (progressCircles.length === 0 || theme != videoTheme) {
      dispatch(resetGame({ videos: videos, newTheme: videos[0].theme }))
    }
  }, [dispatch, progressCircles.length, videos, currIndex, theme])

  // Check if game is finished
  useEffect(() => {
    if (currIndex >= videos.length && progressCircles.length > 0 && !gameEndTime) {
      dispatch(setGameEndTime(Date.now()))
    }
  }, [dispatch, currIndex, progressCircles.length, gameEndTime, videos.length])

  // Handle guess updates
  useEffect(() => {
    dispatch(processGuess({
      gameMode: gameMode,
      guess: guess
    }));

  }, [dispatch, guess, gameMode]);

  // TODO: May add to slice
  const timeTaken = gameStartTime && gameEndTime ? formatStatsTime(gameEndTime - gameStartTime) : "0m 0s";
  const avgTimePerGuess = gameStartTime && gameEndTime ? formatStatsTime((gameEndTime - gameStartTime) / videos.length) : "0m 0s";

  return (
    <div className="flex flex-col justify-center items-center">
      {!gameEndTime ? (
        <>
          <GameModuleVideo
            videoId={videos[currIndex]?.videoId}
            videoTitle={videos[currIndex]?.title}
          />

          <div className="videoFooter flex flex-col m-4">
            <GameProgress />
            <GameModuleAnswers
              setGuess={(guess) => dispatch(setGuess(guess))}
              gameMode={gameMode}
            />
          </div>
        </>
      ) : (
        <GameModuleResults
          onDone={() => router.push('/')}
          timeTaken={timeTaken}
          avgTimePerGuess={avgTimePerGuess}
        />
      )}
    </div>
  )
}

export default GameModule