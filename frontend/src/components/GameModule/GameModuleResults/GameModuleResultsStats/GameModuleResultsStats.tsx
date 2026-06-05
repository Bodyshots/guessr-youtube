import GameModuleResultsHistory from './GameModuleResultsHistory/GameModuleResultsHistory';
import GameModuleResultsPersonal from './GameModuleResultsPersonal/GameModuleResultsPersonal';

interface GameModuleResultsStatsProps {
  timeTaken: string
  avgTimePerGuess: string
}

const GameModuleResultsStats = ({
  timeTaken,
  avgTimePerGuess,
}: GameModuleResultsStatsProps) => {

  return (
    <div className="flex flex-row justify-center gap-4 py-4">
      <GameModuleResultsPersonal
        timeTaken={timeTaken}
        avgTimePerGuess={avgTimePerGuess}
      />

      <GameModuleResultsHistory />
    </div>
  )
}

export default GameModuleResultsStats
