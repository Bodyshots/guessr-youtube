"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import GameModuleHLResultsStats from './GameModuleHLResultsStats/GameModuleHLResultsStats';
import { useAppSelector } from '@/redux/store';
import { getGuessResults } from '@/lib/utils';
import { GameModuleHLProgress } from '../GameModuleHLProgress/GameModuleHLProgress';
import { SCORE_LINES } from '@/constants/scorelines';
import GameModuleHLResultsScores from './GameModuleHLResultsScores/GameModuleHLResultsScores';

interface GameModuleHLResultsProps {
  onDone: () => void;
  timeTaken: string;
  avgTimePerGuess: string;
  gameMode: string;
}

const randNum = Math.random();

const GameModuleHLResults = ({
  onDone,
  timeTaken,
  avgTimePerGuess,
  gameMode
}: GameModuleHLResultsProps) => {
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);

  const [correctGuesses, totalGuesses] = getGuessResults(progressCircles);
  const scoreLineGroup = SCORE_LINES[correctGuesses as keyof typeof SCORE_LINES];
  const [showStats, setShowStats] = useState(false);
  const getRandomScorelineIndex = () => {
    return Math.floor(randNum * scoreLineGroup.length);
  }

  return (
    <div className="w-2/3 h-full m-auto flex flex-col justify-center items-center p-auto align-middle top-0 bottom-0 left-0 right-0 py-15">
      <GameModuleHLProgress
        copyBtn={true}
        interactable={true}
        gameMode={gameMode}
      />

      {!showStats ? (
        <>
          <GameModuleHLResultsScores
            correctGuesses={correctGuesses}
            totalGuesses={totalGuesses}
          />

          <div className='text-muted-foreground italic text-lg'>
            {scoreLineGroup[getRandomScorelineIndex()]}
          </div>
        </>
      ) : (
        <GameModuleHLResultsStats
          timeTaken={timeTaken}
          avgTimePerGuess={avgTimePerGuess}
        />
      )}

      <div className="flex gap-3 justify-center mt-8">
        <Button
          variant="outline"
          onClick={() => setShowStats(!showStats)}
          className="w-32"
        >
          {showStats ? "Back" : "Stats"}
        </Button>
        <Button
          onClick={onDone}
          className="w-32"
        >
          Done
        </Button>
      </div>
    </div>
  )
}

export default GameModuleHLResults
