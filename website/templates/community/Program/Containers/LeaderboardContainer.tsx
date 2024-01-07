// import { useEventMembers } from "@hooks/community/useEventMembers";
// import {
//   leaderboardWeekTypes,
//   // profileSubNav,
// } from "@hooks/community/useCommunityParams";
import { UserRank } from "@models/Activities/Activity";
import {
  eventTypes,
  RoundObject,
  SprintObject,
  // LeaderboardDescription,
  // leaderboardKPIs,
} from "@models/Event/Event";
import { TerraUser } from "@models/Terra/TerraUser";
// import TopHeader from "@templates/community/Thread/TopHeader";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
// import HallOfFameWrapper from "../HallOfFame/HallOfFameWrapperLeader";
import LeaderWrapper from "../MemberStrip/LeaderWrapper";
// import PrizesWrapper from "../Prizes/PrizesWrapper";
import PrizesWrapperV2 from "../Prizes/PrizeWrapperV2";
// import ProfileContainer from "./ProfileContainer";

interface Props {
  eventId?: string;
  parentId?: string;
  // cohortId?: string;
  communityId: string;
  state?: "finished" | "active";
  eventType?: eventTypes;
  terraUser?: TerraUser;
  uid?: string;
  leaderKey?: string;
  eventKey: string;
  isMember?: boolean;
  challengeLength?: number;
  after?: number;
  // leaderDescription: LeaderboardDescription[];
  // selectedLeaderboard: leaderboardKPIs;
  // onLeaderboardChange: (newL: leaderboardKPIs) => void;
  savedList: string[];
  prizes?: ListItem[];
  // onGoBack: () => void;
  // onProfileNameClick: (uid: string) => void;
  // pId: string;
  // profileNav: profileSubNav;
  // onProfileSubNav: (newNav: profileSubNav) => void;
  // viewerIsCoach?: boolean;
  // viewerId?: string;
  myUserRank?: UserRank;
  // authStatus: "PENDING" | "SUCCESS" | "FAILED";
  // newAuthRequest: () => void;
  isAdmin: boolean;
  leaderboardWeek?: string;
  onLeaderboardWeekChange: (newWeek: string) => void;
  leaderboardMonth: string;
  onLeaderboardMonthChange: (newMonth: string) => void;
  // sprintLength: number;
  // roundLength: number;
  sprints: SprintObject[];
  rounds: RoundObject[];
}

const LeaderContainer: React.FC<Props> = ({
  eventId,
  // cohortId,
  leaderboardWeek,
  onLeaderboardWeekChange,
  leaderboardMonth,
  onLeaderboardMonthChange,
  myUserRank,
  communityId,
  parentId,
  eventType,
  state,
  terraUser,
  eventKey,
  uid,
  leaderKey,
  isMember,
  challengeLength,
  after,
  // leaderDescription,
  // selectedLeaderboard,
  // onLeaderboardChange,
  savedList,
  prizes,
  // sprintLength,
  // roundLength,
  sprints,
  rounds,
  // onProfileNameClick,
  // onGoBack,
  // pId,
  // profileNav,
  // viewerIsCoach,
  // onProfileSubNav,
  // viewerId,
  // authStatus,
  // newAuthRequest,
  isAdmin,
}) => {
  // console.log("sss", myUserRank);
  return (
    <>
      <div className="bg-white  rounded-lg shadow-sm border-b">
        {eventType === "challenge" && (state !== "finished" || !parentId) ? (
          <div className="p-0">
            <LeaderWrapper
              parentId={parentId ? parentId : eventId}
              leaderboardWeek={leaderboardWeek}
              sprints={sprints}
              rounds={rounds}
              onLeaderboardWeekChange={onLeaderboardWeekChange}
              leaderboardMonth={leaderboardMonth}
              onLeaderboardMonthChange={onLeaderboardMonthChange}
              eventKey={eventKey}
              isAdmin={isAdmin}
              communityId={communityId}
              numInitMembers={10}
              terraUser={terraUser}
              uid={uid}
              myUserRank={myUserRank}
              leaderKey={leaderKey}
              isMember={isMember}
              challengeLength={challengeLength}
              after={after}
              savedList={savedList}
            />
          </div>
        ) : null}
      </div>
      <div className="pt-8">
        <PrizesWrapperV2
          heading="Prizes"
          prizes={prizes}
          canSubmit={isMember}
          setPostRequest={() => {}}
        />
      </div>
      <div className="h-24" />
    </>
  );
};

export default LeaderContainer;
