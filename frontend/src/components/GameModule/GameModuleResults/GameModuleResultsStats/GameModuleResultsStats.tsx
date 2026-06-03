"use client"

import { ScrollArea } from '@/components/ui/scroll-area'
import { useAppSelector } from "@/redux/store";
import { PROGRESS_HIGHLIGHT_COLORS, ProgressConstants } from "@/constants/progresscircle";
import { getGuessResults } from "@/lib/utils";

interface GuessRecord {
  videoTitle: string
  videoId: string
  guess: string
  correct: boolean
}

interface GameModuleResultsStatsProps {
  timeTaken: string
  avgTimePerGuess: string
}

const GameModuleResultsStats = ({
  timeTaken,
  avgTimePerGuess,
}: GameModuleResultsStatsProps) => {
  // Map videos to guess records with actual data
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);
  const [correctGuesses, totalGuesses] = getGuessResults(progressCircles);
  const videos = useAppSelector((state) => state.game_persist.videos);

  const accuracy = totalGuesses > 0 ? ((correctGuesses / totalGuesses) * 100).toFixed(1) : 0

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Timing Stats */}
      <div className="grid grid-cols-2 gap-2 text-center border rounded-lg p-3 bg-muted/50">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1">Time Taken</p>
          <p className="text-lg font-bold">{timeTaken}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1">Avg per Guess</p>
          <p className="text-lg font-bold">{avgTimePerGuess}</p>
        </div>
      </div>

      {/* Accuracy Summary */}
      <div className="text-center border rounded-lg p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
        <p className="text-2xl font-bold">{accuracy}%</p>
        <p className="text-xs text-muted-foreground mt-2">
          {correctGuesses} out of {totalGuesses} guesses
        </p>
      </div>

      {/* Guess Records */}
      <div>
        <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
          Guesses History
        </h4>
        <ScrollArea className="h-96 w-full rounded-lg border p-4">
          <div className="flex flex-col gap-4">
            {progressCircles.map((progressCircle, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${progressCircle.highlightColor}`}
              >
                {/* Video Embed */}
                <div className="mb-3 rounded overflow-hidden">
                  <iframe
                    width="100%"
                    height="150"
                    src={`https://www.youtube.com/embed/${videos[index].videoId}`}
                    title={videos[index].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video Title */}
                <p className="text-sm font-medium line-clamp-2 mb-2">
                  {videos[index].title}
                </p>

                {/* Guess Info */}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Guess:
                    <span className="font-semibold">
                      {((typeof progressCircle.guess === "number")
                        ? ((progressCircle.guess > videos[index].viewCount)
                          ? "Higher"
                          : "Lower")
                        : (progressCircle.guess instanceof Date ? progressCircle.guess.toLocaleDateString() : progressCircle.guess)
                      )}
                    </span>
                  </p>
                  <span
                    className={`text-xs font-bold ${progressCircle.textColor}`}
                  >
                    {progressCircle.status === ProgressConstants.CORRECT ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default GameModuleResultsStats
