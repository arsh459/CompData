import { badgeTypes } from "@models/Prizes/PrizeV2";
import clsx from "clsx";
import { getbadgeColor } from "./Badges/utils";

interface Props {
  isMe: boolean;
  name: string;
  points: number;
  myPoints: number;
  badgeType: badgeTypes;
  isGoalWidget?: boolean;
}

const WinningFP: React.FC<Props> = ({
  isMe,
  name,
  points,
  myPoints,
  badgeType,
  isGoalWidget,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#242424] via-[#262626] to-[#1A1A1A] rounded-xl p-2">
      <div className="flex justify-center items-center pb-2">
        <div className="w-8 h-8 rounded-full bg-black" />
        <p
          className={clsx(
            isGoalWidget
              ? "text-[8px] iphoneX:text-[10px]"
              : "text-[10px] iphoneX:text-xs",
            "pl-4"
          )}
          style={{ color: isMe ? "#6EC576" : getbadgeColor(badgeType).color1 }}
        >
          {name} is Winning at {points} Fitpoints
        </p>
      </div>
      <div
        className={clsx(
          isGoalWidget ? "text-xs iphoneX:text-sm" : "iphoneX:text-lg",
          "bg-[#575757] text-[#F9F9F9] rounded-xl flex justify-between items-center px-2 py-1.5"
        )}
      >
        <p>Your Fitpoints</p>
        <p className="pl-4">{myPoints}FP</p>
      </div>
    </div>
  );
};

export default WinningFP;
