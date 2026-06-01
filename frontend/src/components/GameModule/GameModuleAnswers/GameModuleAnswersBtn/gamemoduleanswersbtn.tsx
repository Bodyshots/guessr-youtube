import { Button } from "@/components/ui/button"

interface GameModuleAnswersBtnProps {
  setGuess: (guess: boolean | null) => void;
  higher: boolean;
  btnTxt: string;
}

const GameModuleAnswersBtn = ({ setGuess, higher, btnTxt }: GameModuleAnswersBtnProps) => {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => setGuess(higher)}
      className="w-full text-md"
    >
      {btnTxt}
    </Button>
  )
}

export default GameModuleAnswersBtn