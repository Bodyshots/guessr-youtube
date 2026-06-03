"use client"

import { Video } from "@/constants/video";
import { GameProgress } from "./GameModuleProgress/gamemoduleprogress"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GameModuleAnswers from "./GameModuleAnswers/gamemoduleanswers";
import { ProgressConstants, ProgressState } from "@/constants/progresscircle";
import { setGuess, processGuess, setProgressStates, setGameStartTime, setGameEndTime, setTarget } from "@/redux/slices/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import GameModuleResults from "./GameModuleResults/GameModuleResults";
import { formatStatsTime } from "@/lib/utils";
import GameModuleVideo from "./GameModuleVideo/gamemodulevideo";
import { GameMode, GameModeConstants } from "@/constants/gamemode";

interface GameModuleProps {
  videos: Video[];
  gameMode: GameMode;
}

const GameModule = ({ videos, gameMode }: GameModuleProps) => {
  const currIndex = useAppSelector((state) => state.game_persist.currIndex);
  const target = useAppSelector((state) => state.game_persist.target);
  const guess = useAppSelector((state) => state.game_persist.guess);
  const progressStates = useAppSelector((state) => state.game_persist.progressStates);
  const gameStartTime = useAppSelector((state) => state.game_persist.gameStartTime);
  const gameEndTime = useAppSelector((state) => state.game_persist.gameEndTime);

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Config initial states based on whether new data has been enterred
  useEffect(() => {
    if (progressStates.length === 0) {
      dispatch(setProgressStates(videos.map(() => ProgressConstants.UNFINISHED)));
      dispatch(setGameStartTime(Date.now()));
    }
  }, [dispatch, progressStates.length, videos])

  // Check if game is finished
  useEffect(() => {
    if (currIndex >= videos.length && progressStates.length > 0 && !gameEndTime) {
      dispatch(setGameEndTime(Date.now()))
    }
  }, [dispatch, currIndex, progressStates.length, gameEndTime, videos.length])

  // Handle guess updates
  useEffect(() => {

    // No guess made or end of game
    if (guess === null || currIndex >= videos.length) return;

    let currState: ProgressState = ProgressConstants.UNFINISHED;

    switch (gameMode) {
      // Number target - Higher/Lower
      case GameModeConstants.VIEWERS:
      case GameModeConstants.LIKES:

        const viewers = gameMode === GameModeConstants.VIEWERS
        const count = (viewers) ? videos[currIndex].viewCount : videos[currIndex].likeCount;
        const higher = count > target;

        // Guess made
        if (guess != null) {
          if ((higher && guess === true) || (!higher && !guess)) {
            currState = ProgressConstants.CORRECT;
          }
          else currState = ProgressConstants.INCORRECT;
        }

        // Set new target
        if (viewers) dispatch(setTarget(videos[currIndex].viewCount));
        else dispatch(setTarget(videos[currIndex].likeCount));

        break;

      // Date target - Get closest to date
      case (GameModeConstants.UPLOAD): // Date target (TODO)
        return;

      // Category target - Guess the category
      case (GameModeConstants.GENRE): // Category target (TODO)
        return;
    }

    // Update progress state for current index
    const newProgressStates = [...progressStates];
    newProgressStates[currIndex] = currState;
    dispatch(processGuess(newProgressStates));

  }, [guess, currIndex, progressStates, dispatch, target, gameMode, videos]);

  // Calculate correct guesses
  const correctGuesses = progressStates.filter(
    (state) => state === ProgressConstants.CORRECT
  ).length;

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
            <GameProgress
              progressStates={progressStates}
            />

            <GameModuleAnswers
              setGuess={(guess) => dispatch(setGuess(guess))}
              gameMode={gameMode}
            />
          </div>
        </>
      ) : (
        <GameModuleResults
          correctGuesses={correctGuesses}
          totalGuesses={videos.length}
          onDone={() => router.push('/')}
          timeTaken={timeTaken}
          avgTimePerGuess={avgTimePerGuess}
          videos={videos}
        />
      )}
    </div>
  )
}

export default GameModule