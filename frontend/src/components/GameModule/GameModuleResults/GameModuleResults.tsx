"use client"

import { useState } from 'react'
import { Video } from "@/constants/video";
import { Button } from '@/components/ui/button'
import GameModuleResultsStats from './GameModuleResultsStats/GameModuleResultsStats';

interface GameModuleResultsProps {
  correctGuesses: number
  totalGuesses: number
  onDone: () => void
  timeTaken: string
  avgTimePerGuess: string
  videos: Video[]
}

const GameModuleResults = ({
  correctGuesses,
  totalGuesses,
  onDone,
  timeTaken,
  avgTimePerGuess,
  videos
}: GameModuleResultsProps) => {
  const [showStats, setShowStats] = useState(false);

  // Temporary values
  const visitorAverage = 4250
  const visitorTotal = 15000

  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <div className="w-full max-w-2xl bg-background border border-border rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-yt_font font-bold p-4">
            {showStats ? "Your Stats" : "Game Over"}
          </div>
        </div>

        {!showStats ? (
          <div className="flex flex-col gap-8 py-6">
            {/* Score Section */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Your Score
              </h3>
              <p className="text-4xl font-bold">
                {correctGuesses}/{totalGuesses}
              </p>
            </div>

            {/* Visitor Average Section */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Visitor Average Guesses
              </h3>
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
            correctGuesses={correctGuesses}
            totalGuesses={totalGuesses}
            timeTaken={timeTaken}
            avgTimePerGuess={avgTimePerGuess}
            videos={videos}
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
    </div>
  )
}

export default GameModuleResults
