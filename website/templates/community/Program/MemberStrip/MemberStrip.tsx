import { useEventMembers } from "@hooks/community/useEventMembers";
import { eventTypes, leaderboardKPIs } from "@models/Event/Event";
import { TerraUser } from "@models/Terra/TerraUser";
import Member from "@templates/community/Members/Member";
// import LeaderWrapper from "./LeaderWrapper";
import NextMemberButton from "./NextMemberButton";
import { LeaderboardDescription } from "@models/Event/Event";
import { UserRank } from "@models/Activities/Activity";
import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";

interface Props {
  eventId: string;
  parentId?: string;
  cohortId?: string;
  communityId: string;
  eventKey: string;
  nbMembers: number;
  state?: "finished" | "active";
  eventType?: eventTypes;
  terraUser?: TerraUser;
  uid?: string;
  leaderKey?: string;
  isMember?: boolean;
  challengeLength?: number;
  after?: number;
  leaderDescription: LeaderboardDescription[];
  selectedLeaderboard: leaderboardKPIs;
  onLeaderboardChange: (newL: leaderboardKPIs) => void;
  savedList: string[];
  onProfileNameClick: (uid: string) => void;
  myUserRank?: UserRank;
  isAdmin: boolean;
  leaderboardWeek?: leaderboardWeekTypes;
  onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
}

const MemberStrip: React.FC<Props> = ({
  eventId,
  cohortId,
  communityId,
  parentId,
  nbMembers,
  eventKey,
  eventType,
  myUserRank,
  state,
  terraUser,
  uid,
  leaderKey,
  isMember,
  challengeLength,
  after,
  leaderDescription,
  selectedLeaderboard,
  onLeaderboardChange,
  savedList,
  onProfileNameClick,
  isAdmin,
  leaderboardWeek,
  onLeaderboardWeekChange,
}) => {
  const { members, nextMembersExist, onNextMember } = useEventMembers(
    eventId,
    cohortId
  );

  // console.log("state", state);

  return (
    <div className="bg-white  rounded-lg shadow-sm">
      {eventType === "challenge" && (state !== "finished" || !parentId) ? (
        <div className="p-0 px-0">
          {/* <LeaderWrapper
            parentId={parentId ? parentId : eventId}
            leaderboardWeek={leaderboardWeek}
            onLeaderboardWeekChange={onLeaderboardWeekChange}
            selectedLeaderboard={selectedLeaderboard}
            onLeaderboardChange={onLeaderboardChange}
            eventKey={eventKey}
            communityId={communityId}
            isAdmin={isAdmin}
            myUserRank={myUserRank}
            leaderDescription={leaderDescription}
            terraUser={terraUser}
            uid={uid}
            leaderKey={leaderKey}
            isMember={isMember}
            challengeLength={challengeLength}
            after={after}
            savedList={savedList}
          /> */}
        </div>
      ) : null}

      {members.length > 0 ? (
        <div className="px-4 py-2">
          {nbMembers ? (
            <p className="text-gray-700 font-semibold text-sm pb-2">{`Members (${nbMembers})`}</p>
          ) : null}
          <div className="flex overflow-scroll scrollbar-hide pb-0">
            <>
              {members.map((item) => {
                return (
                  <div
                    key={`member-circle-${item.uid}`}
                    className="pr-2 flex-none"
                  >
                    <Member
                      name={item.name}
                      onImgClick={() => onProfileNameClick(item.uid)}
                      profileImage={item.profileImage}
                      cohortName=""
                      tagline=""
                      size="small"
                      enrolledEvents={[]}
                    />
                  </div>
                );
              })}

              {nextMembersExist ? (
                <div className="">
                  <NextMemberButton onClick={onNextMember} />
                </div>
              ) : null}
            </>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MemberStrip;
