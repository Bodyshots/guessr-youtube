interface GameModuleHLResultsScoresProps {
  correctGuesses: number;
  totalGuesses: number;
}

const GameModuleHLResultsScores = ({ correctGuesses, totalGuesses }: GameModuleHLResultsScoresProps) => {

  // Temporary values
  const visitorAverage = 4
  const visitorTotal = 10

  return (
    <div className="flex flex-row gap-10 py-4 my-4 justify-center">
      {/* Score Section */}
      <div className="text-center">
        <span className="text-lg p-4 font-semibold text-muted-foreground mb-2">
          Your Score
        </span>
        <p className="text-5xl font-bold">
          {correctGuesses}/{totalGuesses}
        </p>
      </div>

      {/* Visitor Average Section */}
      <div className="text-center">
        <span className="text-lg p-4 font-semibold text-muted-foreground mb-2">
          Community Average
        </span>
        <p className="text-5xl font-bold">
          {visitorAverage.toLocaleString()}/{visitorTotal.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default GameModuleHLResultsScores