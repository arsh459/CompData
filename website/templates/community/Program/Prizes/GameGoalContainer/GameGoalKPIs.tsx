import { GameKPITarget } from "@models/Event/Event";
import { iconGoalType, KPIConfig } from "@models/Tasks/SystemKPIs";
import WhatYouGainWidget from "../WhatYouGainWidget";

interface Props {
  goals: GameKPITarget[];
}

const GameGoalKPIs: React.FC<Props> = ({ goals }) => {
  return (
    <div className="flex  justify-around items-centers">
      {goals.map((item) => {
        const kpiObj = KPIConfig[item.kpi];

        let icon: iconGoalType = "pace";
        let label: string = "Days";
        let target: number = 6;
        if (kpiObj) {
          label = kpiObj.label;
          target = item.targetValue;
          icon = kpiObj.icon;
        }

        return (
          <div key={item.kpi}>
            <WhatYouGainWidget target={target} icon={icon} text={label} />
          </div>
        );
      })}
    </div>
  );
};

export default GameGoalKPIs;
