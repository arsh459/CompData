import {
  leaderboardWeekTypes,
  navLevels,
} from "@hooks/community/useCommunityParams";
import { usePostsV2 } from "@hooks/community/usePostsV2";
import { UserRank } from "@models/Activities/Activity";
import { EventInterface, leaderboardKPIs } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import LeaderboardWrapper from "@templates/leaderboard/LeaderboardWrapper";
// import apper from "@templates/leaderboard/LeaderboardWrapper";
import clsx from "clsx";
import PersonalKPIs from "../PersonalKPIs/PersonalKPIs";
import ProgressV2 from "../PersonalKPIs/ProgressV2";
// import ProgressV2 from "../PersonalKPIs/ProgressV2";
import ProgramV2 from "../Program/ProgramV2";
// import ProgramV3 from "../Program/ProgramV3";
// import Thread from "../Thread/Thread";

interface Props {
  leader: LeaderBoard;
  selectedEvent?: EventInterface;
  signedInUser?: UserInterface;
  joinURL: string;
  setParentPostId: (newId: string) => void;
  setAuthIsVisible: () => void;
  navState: navLevels;
  selectedCohortId: string;
  parentPostId?: string;
  numClaps?: number;
  numCheckins?: number;
  leaderboard?: boolean;
  viewOnly?: boolean;
  onNewPost: () => void;
  isMember: boolean;
  parentEvent?: EventInterface;

  selectedLeaderboard: leaderboardKPIs;
  onLeaderboardChange: (newL: leaderboardKPIs) => void;
  myUserRank?: UserRank;
  savedList: string[];

  onNavChange: (navLevel: navLevels) => void;
  nowIndex: number;
  onProfileNameClick: (uid: string) => void;
  leaderboardWeek?: leaderboardWeekTypes;
  onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
  // onWorkoutClick: () => void;
}

const ProgramWrapper: React.FC<Props> = ({
  leader,
  selectedEvent,
  leaderboard,
  signedInUser,
  joinURL,
  setAuthIsVisible,
  navState,
  selectedCohortId,
  numClaps,
  setParentPostId,
  numCheckins,
  viewOnly,
  parentPostId,
  onNewPost,
  isMember,
  parentEvent,
  selectedLeaderboard,
  onLeaderboardChange,
  myUserRank,
  savedList,
  nowIndex,
  onProfileNameClick,
  leaderboardWeek,
  onLeaderboardWeekChange,

  onNavChange,
}) => {
  const { posts, nextExists, onNext, postFilter, setPostFilter } = usePostsV2(
    selectedEvent?.id,
    leader.uid,
    signedInUser?.uid
  );

  // console.log("leaderboard", leaderboard);

  return (
    <div className={clsx("flex", leaderboard ? "" : "bg-gray-100")}>
      <div
        className={clsx(
          navState === "program" || navState === "compose"
            ? // navState === "profile"
              viewOnly
              ? "w-full lg:w-3/5"
              : "w-full md:w-3/5"
            : "w-3/5 hidden md:block"
        )}
      >
        {parentPostId && selectedEvent ? (
          <div>
            {/* <Thread
              selectedCohortId={selectedCohortId}
              viewerUID={signedInUser?.uid}
              viewerImg={signedInUser?.profileImage}
              viewerName={signedInUser?.name}
              leader={leader}
              postEventId={selectedEvent?.id}
              parentEventId={selectedEvent.parentId}
              isAdmin={signedInUser?.role === "admin"}
              parentPostId={parentPostId}
              joinURL={joinURL}
              setAuthIsVisible={setAuthIsVisible}
              isMember={isMember}
            /> */}
          </div>
        ) : selectedEvent && selectedEvent.eventKey ? (
          <ProgramV2
            leader={leader}
            selectedEvent={selectedEvent}
            leaderboardWeek={leaderboardWeek}
            onLeaderboardWeekChange={onLeaderboardWeekChange}
            postsV2={posts}
            onNext={onNext}
            viewOnly={viewOnly}
            navState={navState}
            nextExists={nextExists}
            postFilter={postFilter}
            setPostFilter={setPostFilter}
            user={signedInUser}
            communityId={leader.uid}
            isMember={isMember}
            selectedCohortId={selectedCohortId}
            joinURL={joinURL}
            setParentPostId={setParentPostId}
            setAuthIsVisible={setAuthIsVisible}
            parentEvent={parentEvent}
            selectedLeaderboard={selectedLeaderboard}
            onLeaderboardChange={onLeaderboardChange}
            myUserRank={myUserRank}
            savedList={savedList}
            onNavChange={onNavChange}
            nowIndex={nowIndex}
          />
        ) : null}
      </div>
      <div
        className={clsx(
          navState === "program" ||
            // navState === "profile" ||
            navState === "compose"
            ? viewOnly
              ? "hidden lg:block"
              : "hidden md:block"
            : "",
          // "pt-9",
          viewOnly ? "w-full lg:w-2/5 lg:pl-4" : "w-full md:w-2/5 md:pl-4"
        )}
      >
        {selectedEvent?.parentId &&
        signedInUser?.uid &&
        signedInUser?.enrolledEvents?.includes(selectedEvent.id) ? (
          <ProgressV2
            eventName={selectedEvent.name}
            onProfileNameClick={onProfileNameClick}
            leader={leader}
            signedInUser={signedInUser}
            parentId={selectedEvent.parentId}
            after={parentEvent?.eventStarts}
            challengeLength={parentEvent?.challengeLength}
            myUserRank={myUserRank}
            savedList={savedList}
          />
        ) : (
          <PersonalKPIs
            signedInUID={signedInUser?.uid}
            onProfileNameClick={onProfileNameClick}
            numClaps={
              signedInUser?.numClaps ? signedInUser?.numClaps : numClaps
            }
            checkIns={
              signedInUser?.numCheckins
                ? signedInUser?.numCheckins
                : numCheckins
            }
            onJoin={setAuthIsVisible}
            creatorName={leader.name}
            onNewPost={onNewPost}
            isMember={isMember}
          />
        )}

        {leaderboard ? (
          <div className="mt-2">
            <LeaderboardWrapper numEntries={2} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProgramWrapper;
