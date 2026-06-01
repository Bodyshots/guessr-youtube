import GameModuleAnswersBtn from "./GameModuleAnswersBtn/gamemoduleanswersbtn";

interface GameModuleAnswersProps {
  setGuess: (guess: boolean | null) => void;
}

const GameModuleAnswers = ({ setGuess }: GameModuleAnswersProps) => {
  return (
    <div className="text-xl m-4 flex flex-col gap-4">
      Does this video have a view count higher or lower than 5000 views?
      <div className="answerBtns flex flex-row flex-wrap gap-4 w-full">
        <div className="flex-1">
          <GameModuleAnswersBtn
            setGuess={setGuess}
            higher={true}
            btnTxt="Higher"
          />
        </div>
        <div className="flex-1">
          <GameModuleAnswersBtn
            setGuess={setGuess}
            higher={false}
            btnTxt="Lower"
          />
        </div>
      </div>
    </div>
  )
}

export default GameModuleAnswers