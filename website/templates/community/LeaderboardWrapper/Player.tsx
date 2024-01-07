import clsx from "clsx";
// import { useEventRanks } from "@hooks/community/useEventRanks";
// import { useState } from "react";
// import PlayerDetailsModal from "./PlayerDetailsModal";
// import Loading from "@components/loading/Loading";
// import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { UserRank } from "@models/Activities/Activity";
import { getPointsToShow, getRank } from "../Program/MemberStrip/utils";
import { getLevelColor } from "@templates/LandingPage/levelColor";
import Arrow from "./Arrow";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  //   isModal?: boolean;
  //   eventName: string;
  //   parentId?: string;
  //   communityId: string;
  //   after?: number;
  selectedWeek?: string;
  selectedMonth?: string;
  //   myUserRank?: UserRank;
  each: UserRank;
  isMe?: boolean;
  isLast?: boolean;
  onClick: (userRank: UserRank) => void;
  yesterday: string;
  dayBefore: string;
}

const Player: React.FC<Props> = ({
  selectedWeek,
  selectedMonth,
  //   myUserRank,
  each,
  isMe,
  isLast,
  onClick,
  yesterday,
  dayBefore,
}) => {
  const rank = getRank(each, selectedWeek, selectedMonth);
  const pts = getPointsToShow(each, selectedWeek, selectedMonth);
  const lvl = each.userLevelV2 ? each.userLevelV2 : 0;
  const lvlColor = getLevelColor(lvl);
  //   console.log("rank", rank, each.authorName, pts, lvl);

  return (
    <div
      className={clsx(
        "flex items-center p-2.5 border-white/25",
        !isMe && isLast && "border-b",
        isMe &&
          "sticky -top-0.5 -bottom-0.5 bg-gradient-to-b from-[#006AB6] to-[#025084] rounded-xl border-b-0"
      )}
      onClick={() => {
        onClick(each);
        weEventTrack("gameLeaderboard_playerClick", {
          playerId: each.uid,
          playerName: each.authorName ? each.authorName : "no_playerName",
          self: isMe ? "true" : "false",
        });
      }}
      // setUserRank(each);
      // setIsOpen(true);
    >
      <Arrow each={each} yesterday={yesterday} dayBefore={dayBefore} />
      <h4 className="px-3 flex-1 iphoneX:text-lg">
        <p className="line-clamp-1">
          <span className="font-extrabold">{rank}.</span> {each.authorName}
        </p>
        <p className="text-[10px] iphoneX:text-xs text-[#FF9898] line-clamp-1">
          @{each.teamName}
        </p>
      </h4>
      <div className="w-28 flex justify-between items-center">
        <div
          className={clsx(
            isMe ? "bg-[#02243A]" : "bg-[#022339]",
            "px-3 py-1.5 rounded-lg"
          )}
        >
          <p
            className="text-center text-xs iphoneX:text-sm"
            style={{ color: lvlColor.colorPrimary }}
          >
            Lvl {lvl}
          </p>
        </div>
        <p className="text-center text-sm iphoneX:text-base">
          {pts}
          FP
        </p>
      </div>
    </div>
  );
};

export default Player;
