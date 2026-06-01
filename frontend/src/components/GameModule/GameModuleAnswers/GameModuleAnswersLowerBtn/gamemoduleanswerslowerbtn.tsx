import { Button } from "@/components/ui/button"

interface GameModuleAnswersLowerProps {
  setGuess: (guess: boolean | null) => void;
}

const GameModuleAnswersLowerBtn = ({ setGuess }: GameModuleAnswersLowerProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setGuess(false)}
    >
      Lower
    </Button>
  )
}

export default GameModuleAnswersLowerBtn