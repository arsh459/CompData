// import { useCalendarView } from "@hooks/activities/useCalendarView";
// import { tabs } from "@hooks/community/useEventRanks";
// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
import { UserRank } from "@models/Activities/Activity";
// import { leaderboardKPIs } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { Prize } from "@models/Prizes/Prize";
// import MemberV2 from "@templates/community/Members/MemberV2";
import MemberV3 from "@templates/community/Members/MemberV3";
import { getPointsToShow, getRank } from "./utils";

interface Props {
  // communityId: string;
  // rankMembers: UserRank[];
  coaches: { [uid: string]: LeaderBoard };
  weeklyPrizes?: { [uid: string]: Prize[] };
  // tabValue: tabs;
  // selectedLeaderboard: leaderboardKPIs;
  leaderboardWeek?: string;
  leaderboardMonth?: string;
  weekString: string;
  // nextExists: boolean;
  // onNext: () => void;
  // challengeLength?: number;
  // after?: number;
  savedList: string[];
  // onProfileNameClick: (uid: string) => void;
  myUserRank?: UserRank;
}

const MyUserRank: React.FC<Props> = ({
  coaches,
  myUserRank,
  savedList,
  // selectedLeaderboard,
  // onProfileNameClick,
  leaderboardWeek,
  leaderboardMonth,
  weekString,
  weeklyPrizes,
}) => {
  // const { savedList } = useCalendarView(challengeLength, after);

  const myCoach = myUserRank?.coachCommunityId
    ? coaches[myUserRank?.coachCommunityId]
    : undefined;
  // console.log("myCoach", myUserRank?.coachCommunityId, coaches);
  return myUserRank ? (
    <div>
      <MemberV3
        name={myUserRank.authorName}
        fitPointsV2={getPointsToShow(
          myUserRank,
          leaderboardWeek,
          leaderboardMonth
        )}
        userKey={myUserRank.userKey}
        userLevel={myUserRank.userLevelV2 ? myUserRank.userLevelV2 : 0}
        dayPointObj={myUserRank.dayPointObj}
        uid={myUserRank.uid}
        highlighted={true}
        weeklyPrizes={weeklyPrizes ? weeklyPrizes[myUserRank.uid] : undefined}
        // onProfileNameClick={onProfileNameClick}
        onStreak={myUserRank.onStreak}
        rank={getRank(myUserRank, leaderboardWeek, leaderboardMonth)}
        // scoreMinCal={getCalMin(myUserRank, leaderboardWeek, weekString)}
        streakRank={myUserRank.streakRank}
        numStreaks={myUserRank.numStreaks}
        activities={myUserRank.numActivities}
        avgSpeedRank={myUserRank.avgSpeedRank}
        avgSpeed={myUserRank.avgSpeed}
        teamName={myUserRank.teamName}
        teamKey={myUserRank.teamKey}
        distance={myUserRank.totalDistance}
        // calories={getCals(myUserRank, leaderboardWeek, weekString)}
        // lastTotalCalories={getLastCals(myUserRank, leaderboardWeek)}
        profileImage={myUserRank.authorImg}
        coachKey={myCoach?.userKey}
        coachEventId={myUserRank.coachEventId}
        coachCohortId={myUserRank.coachCohortId}
        dayCalObj={myUserRank.dayCalObj}
        savedList={savedList}
        // selectedLeaderboard={selectedLeaderboard}
        distanceRank={myUserRank.distanceRank}
      />
    </div>
  ) : null;
};

export default MyUserRank;
