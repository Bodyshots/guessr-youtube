"use client"

import { Video } from "@/constants/video";
import { GameProgress } from "./GameModuleProgress/gamemoduleprogress"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GameModuleAnswers from "./GameModuleAnswers/gamemoduleanswers";
import { ProgressConstants, ProgressState } from "@/constants/progresscircle";
import { setGuess, processGuess, setProgressStates, setGameStartTime, setGameEndTime } from "@/redux/slices/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ResultsDialog from "./ResultsDialog/resultsdialog";
import { formatStatsTime } from "@/lib/utils";
import GameModuleVideo from "./GameModuleVideo/gamemodulevideo";

const target = 5000; // temp

export interface getProgressStateProps {
  count: number;
  index: number;
}

export interface GameModuleProps {
  videos: Video[];
}

const GameModule = (props: GameModuleProps) => {

>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)
  const videos: Video[] = props.videos;
  const counts = videos.map((video) => video.viewCount);

  const guess = useAppSelector((state) => state.game_persist.guess);
  const currIndex = useAppSelector((state) => state.game_persist.currIndex);
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
    if (guess === null || currIndex >= counts.length) return;

    const count = counts[currIndex];
    const higher = count > target;
    let currState: ProgressState = ProgressConstants.UNFINISHED;

    if (guess != null) { // A guess was made
      if ((higher && guess === true) || (!higher && !guess)) currState = ProgressConstants.CORRECT;
      else currState = ProgressConstants.INCORRECT;
    }

    // Update progress state for current index
    const newProgressStates = [...progressStates];
    newProgressStates[currIndex] = currState;

    dispatch(processGuess(newProgressStates));
  }, [guess, currIndex, progressStates, counts, dispatch]);

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
            />
          </div>
        </>
      ) : (
        <ResultsDialog
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