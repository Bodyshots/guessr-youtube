import GameModuleAnswerHigherBtn from "./GameModuleAnswersHigherBtn/gamemoduleanswershigherbtn";
import GameModuleAnswersLowerBtn from "./GameModuleAnswersLowerBtn/gamemoduleanswerslowerbtn";
import GameModuleAnswersSkipBtn from "./GameModuleAnswersSkipBtn/gamemoduleanswersskipbtn";

interface GameModuleAnswersProps {
  setGuess: (guess: boolean | null) => void;
}

const GameModuleAnswers = ({ setGuess }: GameModuleAnswersProps) => {
  return (
    <div className="gameAnswerSection">
      <div className="skipBtns">
        <GameModuleAnswerHigherBtn
          setGuess={setGuess}
        />
        <GameModuleAnswersLowerBtn
          setGuess={setGuess}
        />
      </div>
      <GameModuleAnswersSkipBtn
        setGuess={setGuess} />
    </div>
  )
}

export default GameModuleAnswers