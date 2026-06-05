import { getGuessResults } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";

interface GameModuleResultsPersonalProps {
  timeTaken: string;
  avgTimePerGuess: string;
}

const GameModuleResultsPersonal = ({ timeTaken, avgTimePerGuess }: GameModuleResultsPersonalProps) => {

  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);

  const [correctGuesses, totalGuesses] = getGuessResults(progressCircles);

  const accuracy = totalGuesses > 0 ? ((correctGuesses / totalGuesses) * 100).toFixed(1) : 0

  return (
    <div className='grid grid-col-2'>
      <div className="text-center border rounded-lg p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
        <p className="text-2xl font-bold">{accuracy}%</p>
        <p className="text-xs text-muted-foreground mt-2">
          {correctGuesses} out of {totalGuesses} guesses
        </p>
      </div>
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
    </div>
  )
}

export default GameModuleResultsPersonal