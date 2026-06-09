import { useAppSelector } from '@/redux/store';
import GameModuleHLResultsGraph from './GameModuleHLResultsGraph/GameModuleHLResultsGraph';
import { getGuessResults } from '@/lib/utils';
import GameModuleHLResultsScores from '../GameModuleHLResultsScores/GameModuleHLResultsScores';

interface GameModuleHLResultsStatsProps {
  timeTaken: string
  avgTimePerGuess: string
}

const GameModuleHLResultsStats = ({
  timeTaken,
  avgTimePerGuess,
}: GameModuleHLResultsStatsProps) => {

  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);
  const [correctGuesses, totalGuesses] = getGuessResults(progressCircles);

  return (
    <div className="flex flex-col justify-center w-full">
      <GameModuleHLResultsScores
        correctGuesses={correctGuesses}
        totalGuesses={totalGuesses}
      />
      <GameModuleHLResultsGraph
        userScore={1}
      />
      <div className='flex flex-row justify-center gap-4'>
        <div className="text-center">
          <span className="text-lg p-4 font-semibold text-muted-foreground mb-2">
            Time taken
          </span>
          <p className="text-xl font-bold">
            {timeTaken}
          </p>
        </div>
        <div className="text-center">
          <span className="text-lg p-4 font-semibold text-muted-foreground mb-2">
            Average time per guess
          </span>
          <p className="text-xl font-bold">
            {avgTimePerGuess}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameModuleHLResultsStats
