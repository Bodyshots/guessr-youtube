import { Button } from "@/components/ui/button"

interface GameModuleAnswersSkipProps {
  setGuess: (guess: boolean | null) => void;
}

const GameModuleAnswersSkipBtn = ({ setGuess }: GameModuleAnswersSkipProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setGuess(null)}
    >
      Skip
    </Button>
  )
}

export default GameModuleAnswersSkipBtn