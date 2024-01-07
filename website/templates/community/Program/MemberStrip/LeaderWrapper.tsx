// import { useEventRanks } from "@hooks/community/useEventRanks";
import { TerraUser } from "@models/Terra/TerraUser";
// import WearableConnect from "../WearableConnect/WearableConnect";
import CoachLeader from "./CoachLeader";
import FilterStrip from "./FilterStrip";
// import LeaderFilterStrip from "./LeaderFilterStrip";
import UserLeader from "./UserLeader";
// import { LeaderboardDescription, leaderboardKPIs } from "@models/Event/Event";
import { UserRank } from "@models/Activities/Activity";
// import clsx from "clsx";
import WeekSelector from "./WeekSelector";
// import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
// import { useCurrentWeek } from "@hooks/community/useCurrentWeek";
// import { useRankPrizes } from "@hooks/prizes/useRankPrizes";
import { useChallengeWeeks } from "@hooks/community/useChallengeWeeks";
// import MonthSelector from "./MonthSelector";
import AdminStrip from "./AdminStrip";
import MonthSelector from "./MonthSelector";
import { useEffect } from "react";
import mixpanel from "@config/mixpanel";
import { RoundObject, SprintObject } from "@models/Event/Event";
import { useEventRanksDep } from "@hooks/community/dep/useEventRanksDep";

interface Props {
  parentId?: string;
  communityId: string;
  terraUser?: TerraUser;
  myUserRank?: UserRank;
  uid?: string;
  leaderKey?: string;
  isMember?: boolean;
  challengeLength?: number;
  after?: number;
  // leaderDescription: LeaderboardDescription[];
  // selectedLeaderboard: leaderboardKPIs;
  // onLeaderboardChange: (newL: leaderboardKPIs) => void;
  savedList: string[];
  // onProfileNameClick: (uid: string) => void;
  numInitMembers?: number;
  isAdmin: boolean;
  leaderboardWeek?: string;
  onLeaderboardWeekChange: (newWeek: string) => void;
  eventKey: string;
  leaderboardMonth: string;
  onLeaderboardMonthChange: (newMonth: string) => void;
  // sprintLength: number;
  // roundLength: number;
  sprints: SprintObject[];
  rounds: RoundObject[];
}

const LeaderWrapper: React.FC<Props> = ({
  parentId,
  communityId,
  myUserRank,
  uid,
  terraUser,
  leaderKey,
  isMember,
  challengeLength,
  after,
  // leaderDescription,
  // onLeaderboardChange,
  // selectedLeaderboard,
  savedList,
  eventKey,
  numInitMembers,
  isAdmin,
  leaderboardWeek,
  onLeaderboardWeekChange,
  leaderboardMonth,
  onLeaderboardMonthChange,
  // sprintLength,
  // roundLength,
  sprints,
  rounds,
}) => {
  const {
    rankMembers,
    loading,
    coaches,
    tabValue,
    setTabValue,
    rankCoaches,
    nextExists,
    onNext,
    loadingCoaches,
  } = useEventRanksDep(
    parentId,
    communityId,
    numInitMembers,
    leaderboardWeek,
    leaderboardMonth,
    after
  );

  // const { weekString } = useCurrentWeek(after);
  const { weekStrings, weekString, monthString, monthStrings } =
    useChallengeWeeks(
      // sprintLength,
      // leaderboardMonth,
      sprints,
      rounds,
      after,
      challengeLength
    );
  // console.log("weekStrings", weekStrings, weekString);
  // console.log("weekString", weekString);
  // console.log("monthString", monthString);
  // console.log("monthStrings", monthStrings);
  // console.log("monthStrings", monthStrings);
  // console.log("sprints", sprints);
  // console.log("rounds", rounds);

  // console.log("tabValue", tabValue);
  // console.log("leaderboardMonth", leaderboardMonth);
  // console.log("leaderboardWeek", leaderboardWeek);

  // console.log("rankMembers", rankMembers);

  useEffect(() => {
    mixpanel.time_event("leaderboard_time");
    return () => {
      mixpanel.track("leaderboard_time");
    };
  }, []);

  // const rankPrizes = useRankPrizes(parentId, "rank");
  // const weeklyPrizes = useRankPrizes(parentId, "weeklyRank", leaderboardWeek);
  // console.log("weeklyPrizes", weeklyPrizes);

  // console.log("week", weekString, leaderboardWeek, weekStrings);
  // console.log("month", monthString, leaderboardMonth, monthStrings);
  // console.log("my", myUserRank);
  // console.log("rankMembers", rankMembers);
  // return <div></div>;

  return (
    <>
      <div>
        {/* {leaderKey && isMember ? (
          <div className="">
            <WearableConnect
              uid={uid}
              terraUser={terraUser}
              leaderKey={leaderKey}
              eventKey={eventKey}
              workout={false}
            />
          </div>
        ) : null} */}
        <div className="">
          <AdminStrip isAdmin={isAdmin} eventId={parentId} />
        </div>

        <div>
          <MonthSelector
            monthStrings={monthStrings}
            currentMonth={monthString}
            selectedMonth={leaderboardMonth}
            after={after}
            onLeaderboardMonthChange={onLeaderboardMonthChange}
          />
        </div>

        {/* {leaderDescription.length > 1 ? (
          <div
            className={clsx(
              isMember ? "" : "pt-4",
              "pb-4 no-scrollbar scrollbar-hide px-4"
            )}
          >
            <LeaderFilterStrip
              selectedTab={selectedLeaderboard}
              onClick={onLeaderboardChange}
              leaderDescription={leaderDescription}
            />
          </div>
        ) : null} */}

        <div className="">
          <FilterStrip
            selectedTab={tabValue}
            onClick={setTabValue}
            // isAdmin={isAdmin}
            // eventId={parentId}
          />
        </div>

        <div>
          <WeekSelector
            leaderboardWeeks={weekStrings}
            currentWeek={weekString}
            selectedWeek={leaderboardWeek}
            selectedMonth={leaderboardMonth}
            onLeaderboardWeekChange={onLeaderboardWeekChange}
          />
        </div>

        <>
          {rankMembers.length > 0 && tabValue !== "Coaches" ? (
            <div>
              <UserLeader
                tabValue={tabValue}
                loading={loading}
                // weeklyPrizes={weeklyPrizes.prizes}
                weekString={weekString}
                rankMembers={rankMembers}
                leaderboardWeek={leaderboardWeek}
                leaderboardMonth={leaderboardMonth}
                myUserRank={myUserRank}
                // selectedLeaderboard={selectedLeaderboard}
                communityId={communityId}
                coaches={coaches}
                nextExists={nextExists}
                onNext={onNext}
                challengeLength={challengeLength}
                after={after}
                // onProfileNameClick={onProfileNameClick}
                savedList={savedList}
              />
            </div>
          ) : rankCoaches.length > 0 && tabValue === "Coaches" ? (
            <CoachLeader
              loadingCoaches={loadingCoaches}
              coaches={rankCoaches}
              weekString={weekString}
              coachObjects={coaches}
              savedList={savedList}
              leaderboardWeek={leaderboardWeek}
              leaderboardMonth={leaderboardMonth}
              // onProfileNameClick={onProfileNameClick}
            ></CoachLeader>
          ) : (
            <div className="">
              <p className="text-sm text-gray-700 text-center">
                No Results to show
              </p>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default LeaderWrapper;
