import { EventInterface } from "@models/Event/Event";
import GameGoalKPIs from "./GameGoalKPIs";

interface Props {
  game: EventInterface;
}

// three dummy tasks - Make them goal tasks. Max Characters, max words, max sentences

// every task must have goal metrics, hide trackProgress

// characters
// words
// sentences

const GameGoalContainer: React.FC<Props> = ({ game }) => {
  return (
    <div>
      <div className="bg-[#1F1F1F]/25 border border-[#373737] mx-4 my-7 iphoneX:my-14 p-2 iphoneX:p-4 rounded-xl relative z-0">
        <div className="w-full text-[#EBEBEB]">
          <GameGoalKPIs
            goals={game.configuration?.kpis ? game.configuration?.kpis : []}
          />
        </div>
        <p className="text-xs iphoneX:text-base p-2 iphoneX:p-4 text-[#D7D7D7]">
          {game.goalKpiText
            ? game.goalKpiText
            : "Game is designed that you accomplish the above in the duration. In addition to this you can unlock exciting rewards and benefits"}
        </p>
      </div>
    </div>
  );
};

export default GameGoalContainer;
