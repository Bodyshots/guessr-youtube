import HigherLowerBtn from "./HigherLowerBtn/HigherLowerBtn";
import { useAppSelector } from "@/redux/store";
import { wholeFloorX } from "@/lib/utils";
import { OtherConstants } from "@/constants/other";

interface GameModuleHLAnswersProps {
  handleProcessGuess: (userAnswer: number) => void;
  disabled: boolean;
}

const GameModuleHLAnswers = ({ handleProcessGuess, disabled }: GameModuleHLAnswersProps) => {
  const target = useAppSelector((state) => state.game_persist.target);

  return (
    <div className="text-xl m-4 flex flex-col gap-4">
      Does this video have a view count higher or lower than {" "}
      {
        wholeFloorX({ num: target, x: 100 })
          .toLocaleString(OtherConstants.LOCALE)
      } views?
      <div className="answerBtns flex flex-row flex-wrap gap-4 w-full">
        <div className="flex-1">
          {/* TODO: Make Btn applicable for multiple game modes */}
          <HigherLowerBtn
            setGuess={() => handleProcessGuess(target + 1)}
            btnTxt="Higher"
            disabled={disabled}
          />
        </div>
        <div className="flex-1">
          <HigherLowerBtn
            setGuess={() => handleProcessGuess(target - 1)}
            btnTxt="Lower"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}

export default GameModuleHLAnswers