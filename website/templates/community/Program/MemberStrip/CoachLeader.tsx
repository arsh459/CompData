import Loading from "@components/loading/Loading";
// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
import { CoachRank } from "@models/Activities/Activity";
import MemberV3 from "@templates/community/Members/MemberV3";
import { useEffect } from "react";
import { getPointsToShow, getRank } from "./utils";
import mixpanel from "@config/mixpanel";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

interface Props {
  coaches: CoachRank[];
  // onProfileNameClick: (uid: string) => void;
  weekString: string;
  coachObjects: { [uid: string]: LeaderBoard };

  savedList: string[];
  loadingCoaches: boolean;
  leaderboardWeek?: string;
  leaderboardMonth: string;
  //   tabValue: tabs;
}

const CoachLeader: React.FC<Props> = ({
  //   rankMembers,
  weekString,
  coaches,

  // onProfileNameClick,
  leaderboardWeek,
  loadingCoaches,
  savedList,
  leaderboardMonth,
  coachObjects,
  //   tabValue,
}) => {
  useEffect(() => {
    mixpanel.time_event("coach_leaderboard");
    return () => {
      mixpanel.track("coach_leaderboard", {
        week: leaderboardWeek,
        month: leaderboardMonth,
      });
    };
  }, [leaderboardWeek, leaderboardMonth]);

  return (
    <>
      {loadingCoaches ? (
        <div className="h-screen bg-white flex justify-center items-start">
          <div className="pt-8">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      ) : null}
      {coaches.map((rankItem) => {
        return (
          <div
            key={`rank-circle-${rankItem.uid}`}
            className="pr-2 flex-none pb-0.5"
          >
            <MemberV3
              name={rankItem.authorName}
              fitPointsV2={getPointsToShow(
                rankItem,
                leaderboardWeek,
                leaderboardMonth
              )}
              // userLevel={0}
              dayPointObj={rankItem.dayPointObj}
              uid={rankItem.uid}
              rank={getRank(rankItem, leaderboardWeek, leaderboardMonth)}
              teamName={rankItem.teamName}
              teamKey={rankItem.teamKey}
              // scoreMinCal={getTransformations(
              //   rankItem,
              //   leaderboardWeek,
              //   weekString
              // )}
              type="coach"
              activities={0}
              savedList={savedList}
              // calories={getCals(rankItem, leaderboardWeek, weekString)}
              // lastTotalCalories={rankItem.lastTotalCalories}
              profileImage={rankItem.authorImg}
              coachKey={coachObjects[rankItem.uid]?.userKey}
              coachEventId={rankItem.coachEventId}
              coachCohortId={rankItem.coachCohortId}
            />
          </div>
        );
      })}
    </>
  );
};

export default CoachLeader;
