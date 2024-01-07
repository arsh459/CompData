// import { useCalendarView } from "@hooks/activities/useCalendarView";
import Loading from "@components/loading/Loading";
// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
import { tabs } from "@hooks/community/useEventRanks";
import { UserRank } from "@models/Activities/Activity";
// import { leaderboardKPIs } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { Prize } from "@models/Prizes/Prize";
// import MemberV2 from "@templates/community/Members/MemberV2";
import MemberV3 from "@templates/community/Members/MemberV3";
import { useEffect } from "react";
// import { useEffect, useState } from "react";
import NextButton from "../NextButton";
import MyUserRank from "./MyUserRank";
import {
  // getCalMin,
  getPointsToShow,
  // getCals,
  // getLastCals,
  getRank,
} from "./utils";
import mixpanel from "@config/mixpanel";

interface Props {
  communityId: string;
  rankMembers: UserRank[];
  coaches: { [uid: string]: LeaderBoard };
  tabValue: tabs;
  // selectedLeaderboard: leaderboardKPIs;
  nextExists: boolean;
  onNext: () => void;
  challengeLength?: number;
  after?: number;
  savedList: string[];
  // onProfileNameClick: (uid: string) => void;
  myUserRank?: UserRank;
  leaderboardWeek?: string;
  leaderboardMonth?: string;
  weekString: string;
  loading: boolean;
  weeklyPrizes?: { [uid: string]: Prize[] };
}

const UserLeader: React.FC<Props> = ({
  rankMembers,
  loading,
  coaches,
  tabValue,
  nextExists,
  onNext,
  myUserRank,
  weeklyPrizes,
  // rankPrizes,
  savedList,
  // selectedLeaderboard,
  // onProfileNameClick,
  leaderboardWeek,
  weekString,
  leaderboardMonth,
}) => {
  const myRank = getRank(myUserRank, leaderboardWeek, leaderboardMonth);

  // const prev = myRank === 1;
  const last = myRank && myRank >= rankMembers.length;
  const middleVisible = !last;

  useEffect(() => {
    mixpanel.time_event("user_leaderboard");
    return () => {
      mixpanel.track("user_leaderboard", {
        week: leaderboardWeek,
        month: leaderboardMonth,
        tab: tabValue,
      });
    };
  }, [leaderboardWeek, leaderboardMonth, tabValue]);

  // console.log("prev", prev, last, middleVisible);
  //   "calories" | "minCalScore"
  // >("calories");

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     toggleVisibleState((prev) =>
  //       prev === "calories" ? "minCalScore" : "calories"
  //     );
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // console.log("loading", loading);
  // console.log("last", last);
  // console.log("middleVisible", middleVisible);

  return (
    <>
      {loading ? (
        <div className="h-screen bg-white flex justify-center items-start">
          <div className="pt-8">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      ) : null}
      {/* {prev ? (
        <div id="myRank">
          <MyUserRank
            myUserRank={myUserRank}
            coaches={coaches}
            weekString={weekString}
            leaderboardWeek={leaderboardWeek}
            selectedLeaderboard={selectedLeaderboard}
            savedList={savedList}
          />
        </div>
      ) : null} */}

      {rankMembers.map((rankItem) => {
        const coach = coaches[rankItem.coachCommunityId];
        // console.log(
        //   "rankItem",
        //   rankItem.authorName,
        //   rankItem.weekPointObj,
        //   rankItem.dayPointObj,
        //   leaderboardWeek
        // );
        const rk = getRank(rankItem, leaderboardWeek, leaderboardMonth);

        if (
          tabValue !== "Coaches" &&
          // (tabValue === "My Team" &&
          //   rankItem.coachCommunityId === communityId))
          (middleVisible || (!middleVisible && myRank !== rk))
        ) {
          return (
            <div
              key={`rank-circle-${rankItem.uid}`}
              className="pr-0 flex-none"
              id={rk === myRank ? "myRank" : ""}
            >
              <MemberV3
                // fitPointsV2={rankItem.fitPointsV2 ? rankItem.fitPointsV2 : 0}
                fitPointsV2={getPointsToShow(
                  rankItem,
                  leaderboardWeek,
                  // weekString,
                  leaderboardMonth
                )}
                name={rankItem.authorName}
                teamName={rankItem.teamName}
                teamKey={rankItem.teamKey}
                userKey={rankItem.userKey}
                uid={rankItem.uid}
                userLevel={rankItem.userLevelV2 ? rankItem.userLevelV2 : 0}
                dayPointObj={rankItem.dayPointObj}
                highlighted={rk === myRank}
                // scoreMinCal={getCalMin(rankItem, leaderboardWeek, weekString)}
                onStreak={rankItem.onStreak}
                rank={rk}
                streakRank={rankItem.streakRank}
                numStreaks={rankItem.numStreaks}
                weeklyPrizes={
                  weeklyPrizes ? weeklyPrizes[rankItem.uid] : undefined
                }
                activities={rankItem.numActivities}
                avgSpeedRank={rankItem.avgSpeedRank}
                avgSpeed={rankItem.avgSpeed}
                distance={rankItem.totalDistance}
                // calories={getCals(rankItem, leaderboardWeek, weekString)}
                // lastTotalCalories={getLastCals(rankItem, leaderboardWeek)}
                profileImage={rankItem.authorImg}
                coachKey={coach?.userKey}
                coachEventId={rankItem.coachEventId}
                coachCohortId={rankItem.coachCohortId}
                dayCalObj={rankItem.dayCalObj}
                savedList={savedList}
                // selectedLeaderboard={selectedLeaderboard}
                distanceRank={rankItem.distanceRank}
              />
            </div>
          );
        }
      })}

      {last ? (
        <div id="myRank">
          <MyUserRank
            myUserRank={myUserRank}
            weekString={weekString}
            coaches={coaches}
            // selectedLeaderboard={selectedLeaderboard}
            leaderboardWeek={leaderboardWeek}
            leaderboardMonth={leaderboardMonth}
            savedList={savedList}
            weeklyPrizes={weeklyPrizes}
            // onProfileNameClick={onProfileNameClick}
          />
        </div>
      ) : null}

      {nextExists ? (
        <div className="bg-white w-full">
          <NextButton onClick={onNext} />
        </div>
      ) : null}
    </>
  );
};

export default UserLeader;
