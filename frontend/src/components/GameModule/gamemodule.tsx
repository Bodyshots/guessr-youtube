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
<<<<<<< HEAD
import { formatStatsTime } from "@/lib/utils";
import GameModuleVideo from "./GameModuleVideo/gamemodulevideo";
=======
>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)

const target = 5000; // temp

export interface getProgressStateProps {
  count: number;
  index: number;
}

export interface GameModuleProps {
  videos: Video[];
}

const GameModule = (props: GameModuleProps) => {

<<<<<<< HEAD
=======

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
<<<<<<< HEAD
    const higher = count > target;
    let currState: ProgressState = ProgressConstants.UNFINISHED;

    if (guess != null) { // A guess was made
      if ((higher && guess === true) || (!higher && !guess)) currState = ProgressConstants.CORRECT;
      else currState = ProgressConstants.INCORRECT;
    }
=======
    const isCorrect =
      (count > target && guess === true) ||
      (count < target && guess === false);

    const isIncorrect =
      (count > target && guess === false) ||
      (count < target && guess === true);

    let currState: ProgressState = ProgressConstants.UNFINISHED;
    if (isCorrect) currState = ProgressConstants.CORRECT;
    else if (isIncorrect) currState = ProgressConstants.INCORRECT;
>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)

    // Update progress state for current index
    const newProgressStates = [...progressStates];
    newProgressStates[currIndex] = currState;

    dispatch(processGuess(newProgressStates));
  }, [guess, currIndex, progressStates, counts, dispatch]);

  // Calculate correct guesses
  const correctGuesses = progressStates.filter(
    (state) => state === ProgressConstants.CORRECT
  ).length;

<<<<<<< HEAD
  const timeTaken = gameStartTime && gameEndTime ? formatStatsTime(gameEndTime - gameStartTime) : "0m 0s";
  const avgTimePerGuess = gameStartTime && gameEndTime ? formatStatsTime((gameEndTime - gameStartTime) / videos.length) : "0m 0s";
=======
  // Calculate timing stats
  const formatTime = (ms: number): string => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return `${minutes}m ${seconds}s`;
  };

  const timeTaken = gameStartTime && gameEndTime ? formatTime(gameEndTime - gameStartTime) : "0m 0s";
  const avgTimePerGuess = gameStartTime && gameEndTime ? formatTime((gameEndTime - gameStartTime) / videos.length) : "0m 0s";
>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)

  return (
    <div className="flex flex-col justify-center items-center">
      {!gameEndTime ? (
        <>
<<<<<<< HEAD
          <GameModuleVideo
            videoId={videos[currIndex]?.videoId}
            videoTitle={videos[currIndex]?.title}
          />

          <div className="videoFooter flex flex-col m-4">
            <GameProgress
              progressStates={progressStates}
            />

=======
          <iframe width="720" height="576" src={`https://www.youtube.com/embed/${videos[currIndex]?.videoId}`} title="Baby Steps Developers React to 7 Minute Speedrun" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div className="videoFooter">
            <GameProgress
              progressStates={progressStates}
            />
>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)
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