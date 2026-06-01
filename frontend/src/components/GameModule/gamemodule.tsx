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

const target = 5000; // temp

export interface getProgressStateProps {
  count: number;
  index: number;
}

export interface GameModuleProps {
  videos: Video[];
}

const GameModule = (props: GameModuleProps) => {


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
    const isCorrect =
      (count > target && guess === true) ||
      (count < target && guess === false);

    const isIncorrect =
      (count > target && guess === false) ||
      (count < target && guess === true);

    let currState: ProgressState = ProgressConstants.UNFINISHED;
    if (isCorrect) currState = ProgressConstants.CORRECT;
    else if (isIncorrect) currState = ProgressConstants.INCORRECT;

    // Update progress state for current index
    const newProgressStates = [...progressStates];
    newProgressStates[currIndex] = currState;

    dispatch(processGuess(newProgressStates));
  }, [guess, currIndex, progressStates, counts, dispatch]);

  // Calculate correct guesses
  const correctGuesses = progressStates.filter(
    (state) => state === ProgressConstants.CORRECT
  ).length;

  // Calculate timing stats
  const formatTime = (ms: number): string => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return `${minutes}m ${seconds}s`;
  };

  const timeTaken = gameStartTime && gameEndTime ? formatTime(gameEndTime - gameStartTime) : "0m 0s";
  const avgTimePerGuess = gameStartTime && gameEndTime ? formatTime((gameEndTime - gameStartTime) / videos.length) : "0m 0s";

  return (
    <div className="flex flex-col justify-center items-center">
      {!gameEndTime ? (
        <>
          <iframe width="720" height="576" src={`https://www.youtube.com/embed/${videos[currIndex]?.videoId}`} title="Baby Steps Developers React to 7 Minute Speedrun" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div className="videoFooter">
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