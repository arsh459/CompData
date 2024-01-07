import { nFormatter } from "@utils/number";
// import clsx from "clsx";
import GamesKPI from "./GamesKPI";

interface Props {
  cals?: number;
  challengeLength?: number;
  rewardsWorth?: number;
}

const GamesKPIs: React.FC<Props> = ({
  cals,
  challengeLength,
  rewardsWorth,
}) => {
  return (
    <div className="flex">
      {cals ? (
        <div className="pr-4">
          <GamesKPI
            img="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-fire-emergency-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
            text={`${cals} Cal/day`}
            fontColor="text-red-500"
          />
        </div>
      ) : null}
      {challengeLength ? (
        <div className="pr-4">
          <GamesKPI
            img="https://img.icons8.com/ios-filled/100/000000/running.png"
            text={`${challengeLength} days`}
            fontColor="text-gray-700"
          />
        </div>
      ) : null}

      {rewardsWorth ? (
        <div className="">
          <GamesKPI
            img="https://img.icons8.com/color-glass/96/000000/trophy.png"
            text={`₹${nFormatter(rewardsWorth)}`}
            fontColor="text-gray-500"
          />
        </div>
      ) : null}
    </div>
  );
};

export default GamesKPIs;
