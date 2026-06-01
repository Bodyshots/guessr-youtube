import { Button } from "@/components/ui/button"

interface GameModuleAnswersHigherProps {
  setGuess: (guess: boolean | null) => void;
}

const GameModuleAnswersHigherBtn = ({ setGuess }: GameModuleAnswersHigherProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setGuess(true)}
    >
      Higher
    </Button >
  )
}

export default GameModuleAnswersHigherBtn