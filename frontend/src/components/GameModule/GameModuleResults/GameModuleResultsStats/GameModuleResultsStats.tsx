import { useAppSelector } from '@/redux/store';
import GameModuleResultsGraph from './GameModuleResultsGraph/GameModuleResultsGraph';
import { getGuessResults } from '@/lib/utils';
import GameModuleResultsScores from '../GameModuleResultsScores/GameModuleResultsScores';

interface GameModuleResultsStatsProps {
  timeTaken: string
  avgTimePerGuess: string
}

const GameModuleResultsStats = ({
  timeTaken,
  avgTimePerGuess,
}: GameModuleResultsStatsProps) => {

  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);
  const [correctGuesses, totalGuesses] = getGuessResults(progressCircles);

  return (
    <div className="flex flex-col justify-center w-full">
      <GameModuleResultsScores
        correctGuesses={correctGuesses}
        totalGuesses={totalGuesses}
      />
      <GameModuleResultsGraph
        userScore={1}
      />
      {/* <GameModuleResultsHistory /> */}
    </div>
  )
}

export default GameModuleResultsStats
