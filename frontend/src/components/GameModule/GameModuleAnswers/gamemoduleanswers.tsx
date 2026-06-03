import { GameMode } from "@/constants/gamemode";
import GameModuleAnswersBtn from "./GameModuleAnswersBtn/gamemoduleanswersbtn";
import { useAppSelector } from "@/redux/store";

interface GameModuleAnswersProps {
  setGuess: (guess: boolean | null) => void;
  gameMode: GameMode;
}

const GameModuleAnswers = ({ setGuess, gameMode }: GameModuleAnswersProps) => {
  const target = useAppSelector((state) => state.game_persist.target);

  return (
    <div className="text-xl m-4 flex flex-col gap-4">
      Does this video have a view count higher or lower than {target.toLocaleString('en-US')} views?
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