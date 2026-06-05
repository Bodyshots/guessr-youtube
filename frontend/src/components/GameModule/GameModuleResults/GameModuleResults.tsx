"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import GameModuleResultsStats from './GameModuleResultsStats/GameModuleResultsStats';
import { useAppSelector } from '@/redux/store';
import { getGuessResults } from '@/lib/utils';

interface GameModuleResultsProps {
  onDone: () => void
  timeTaken: string
  avgTimePerGuess: string
}

const GameModuleResults = ({
  onDone,
  timeTaken,
  avgTimePerGuess,
}: GameModuleResultsProps) => {
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);
  const videos = useAppSelector((state) => state.game_persist.videos);

  const [correctGuesses, totalGuesses] = getGuessResults(progressCircles);
  const [showStats, setShowStats] = useState(false);

  // Temporary values
  const visitorAverage = 6969
  const visitorTotal = 420

  return (
    <div className="w-auto h-full flex flex-col justify-center items-center py-8">

      {!showStats ? (
        <div className="flex flex-col gap-8 py-6">
          {/* Score Section */}
          <div className="text-center">
            <span className="text-sm p-4 font-semibold text-muted-foreground mb-2">
              Your Score
            </span>
            <p className="text-4xl font-bold">
              {correctGuesses}/{totalGuesses}
            </p>
          </div>

          {/* Visitor Average Section */}
          <div className="text-center">
            <div className="text-sm p-4 font-semibold text-muted-foreground mb-2">
              Visitor Average Guesses
            </div>
            <p className="text-3xl font-bold">
              {visitorAverage.toLocaleString()} / {visitorTotal.toLocaleString()}
            </p>
          </div>

          {/* Timing Section */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                Time Taken
              </p>
              <p className="text-lg font-bold">{timeTaken}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                Avg per Guess
              </p>
              <p className="text-lg font-bold">{avgTimePerGuess}</p>
            </div>
          </div>
        </div>
      ) : (
        <GameModuleResultsStats
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

export default GameModuleResults
