import { Button } from "@/components/ui/button"

interface GameModuleAnswersBtnProps {
  setGuess: () => void;
  btnTxt: string;
}

const GameModuleAnswersBtn = ({ setGuess, btnTxt }: GameModuleAnswersBtnProps) => {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => setGuess()}
      className="w-full text-md"
    >
      {btnTxt}
    </Button>
  )
}

export default GameModuleAnswersBtn