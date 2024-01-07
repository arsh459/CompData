import clsx from "clsx";
import CloseBtn from "../Program/Feed/CloseBtn";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import {
  getLederboardDetailsHeading,
  getSprintRoundHeadings,
} from "../NewCommunitySection/utils";
import {
  monthStateInterface,
  weekStateInterface,
} from "@hooks/community/useChallengeWeeks";
import { weEventTrack } from "@analytics/webengage/user/userLog";
// import { RoundObject, SprintObject } from "@models/Event/Event";

interface Props {
  urlState: communityQueryV3;
  setPeriod: (val: "month" | "week") => void;
  leaderboardWeeks: weekStateInterface[];
  leaderboardMonths: monthStateInterface[];
  openExpandModal?: () => void;
  onCloseExpandModal?: () => void;
  setIsOpenPeriodModal: (val: boolean) => void;
}

const LeaderboardDetailsHeader: React.FC<Props> = ({
  urlState,
  setPeriod,
  leaderboardWeeks,
  leaderboardMonths,
  openExpandModal,
  onCloseExpandModal,
  setIsOpenPeriodModal,
}) => {
  const leaderboardHeading = getLederboardDetailsHeading(
    urlState.period,
    leaderboardWeeks,
    leaderboardMonths,
    urlState.leaderboardWeek,
    urlState.leaderboardMonth
  );

  const { roundName, sprintName } = getSprintRoundHeadings(
    leaderboardWeeks,
    leaderboardMonths,
    urlState.leaderboardWeek,
    urlState.leaderboardMonth
  );

  return (
    <div
      className={clsx(
        urlState.view === "players"
          ? "bg-gradient-to-r from-[#1572B5]/50 to-[#2184CB]/50"
          : "bg-gradient-to-r from-[#D33F64]/50 to-[#D38F3F]/50"
      )}
    >
      <div
        className={clsx(
          "flex justify-between items-center iphoneX:text-xl font-extrabold p-4",
          urlState.view === "players" ? "text-[#FF9898]" : "text-[#D8FD6F]"
        )}
      >
        <p>{leaderboardHeading}</p>
        {openExpandModal ? (
          <img
            src={`https://ik.imagekit.io/socialboat/Vector_6akik0r7W.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652676176035`}
            alt="expand icon"
            className="cursor-pointer"
            onClick={() => {
              openExpandModal();
              weEventTrack("gameLeaderboard_expandClick", {
                viewType: urlState.view ? urlState.view : "no_viewType",
              });
            }}
          />
        ) : null}
        {onCloseExpandModal ? (
          <CloseBtn onCloseModal={onCloseExpandModal} />
        ) : null}
      </div>
      <div className="border-t border-white flex iphoneX:text-xl">
        <div
          className={clsx(
            "flex-1 flex justify-center items-center px-4 py-2.5 border-white",
            urlState.period === "month" ? "border-b-[5px]" : "border-b mb-0.5"
          )}
          onClick={() => setPeriod("month")}
        >
          <p className="mr-2 capitalize">{sprintName}</p>
          {leaderboardMonths.length > 1 ? (
            <img
              src={`https://ik.imagekit.io/socialboat/Polygon_26_H7xyjmTNw9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652676176022`}
              alt="expand icon"
              className="cursor-pointer w-2.5 iphoneX:w-4"
              onClick={() => {
                setIsOpenPeriodModal(true);
                weEventTrack("gameLeaderboard_seasonClick", {
                  viewType: urlState.view ? urlState.view : "no_viewType",
                });
              }}
            />
          ) : null}
        </div>
        <div className="w-px bg-white border-b border-white my-2.5" />
        <div
          className={clsx(
            "flex-1 flex justify-center items-center px-4 py-2.5 border-white",
            urlState.period === "week" ? "border-b-[5px]" : "border-b mb-0.5"
          )}
          onClick={() => setPeriod("week")}
        >
          <p className="mr-2 capitalize">{roundName}</p>
          {leaderboardWeeks.length > 1 ? (
            <img
              src={`https://ik.imagekit.io/socialboat/Polygon_26_H7xyjmTNw9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652676176022`}
              alt="expand icon"
              className="cursor-pointer w-2.5 iphoneX:w-4"
              onClick={() => {
                setIsOpenPeriodModal(true);
                weEventTrack("gameLeaderboard_roundClick", {
                  viewType: urlState.view ? urlState.view : "no_viewType",
                });
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardDetailsHeader;
