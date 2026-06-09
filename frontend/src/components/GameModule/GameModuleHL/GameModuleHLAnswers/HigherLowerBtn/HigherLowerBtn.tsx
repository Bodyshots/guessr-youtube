import { Button } from "@/components/ui/button"

interface GameModuleHLAnswersBtnProps {
  setGuess: () => void;
  btnTxt: string;
  disabled: boolean;
}

const GameModuleHLAnswersBtn = ({ setGuess, btnTxt, disabled }: GameModuleHLAnswersBtnProps) => {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => setGuess()}
      className="w-full text-md"
      disabled={disabled}
    >
      {btnTxt}
    </Button>
  )
}

export default GameModuleHLAnswersBtn