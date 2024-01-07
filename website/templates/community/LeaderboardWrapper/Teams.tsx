import { weEventTrack } from "@analytics/webengage/user/userLog";
import { CoachRank } from "@models/Activities/Activity";
import clsx from "clsx";
import { getPointsToShow, getRank } from "../Program/MemberStrip/utils";
import Arrow from "./Arrow";

interface Props {
  selectedWeek?: string;
  selectedMonth?: string;
  each: CoachRank;
  isMe?: boolean;
  isLast?: boolean;
  onClick: (coachRank: CoachRank) => void;
  yesterday: string;
  dayBefore: string;
}

const Teams: React.FC<Props> = ({
  selectedWeek,
  selectedMonth,
  each,
  isMe,
  isLast,
  onClick,
  yesterday,
  dayBefore,
}) => {
  const rank = getRank(each, selectedWeek, selectedMonth);
  const pts = getPointsToShow(each, selectedWeek, selectedMonth);

  return (
    <div
      className={clsx(
        "flex items-center p-4 border-white/25",
        !isMe && isLast && "border-b",
        isMe &&
          "sticky -top-0.5 -bottom-0.5 bg-gradient-to-b from-[#DE567E] to-[#B92D4C] rounded-xl border-b-0"
      )}
      onClick={() => {
        onClick(each);
        weEventTrack("gameLeaderboard_teamClick", {
          teamId: each.uid,
          teamName: each.teamName ? each.teamName : "no_teamName",
          myTeam: isMe ? "true" : "false",
        });
      }}
    >
      <Arrow each={each} yesterday={yesterday} dayBefore={dayBefore} />
      <h4 className="px-3 iphoneX:text-lg flex-1 line-clamp-1">
        <span className="font-extrabold">{rank}.</span>{" "}
        {each.teamName ? each.teamName : each.authorName}
      </h4>
      <div className="w-16 flex justify-between">
        <div className="w-px bg-white/25" />
        <p className="text-center text-sm iphoneX:text-base">{pts} FP</p>
      </div>
    </div>
  );
};

export default Teams;
