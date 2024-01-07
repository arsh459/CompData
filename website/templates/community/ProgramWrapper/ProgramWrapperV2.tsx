// import {
// leaderboardWeekTypes,
// navLevels,
// } from "@hooks/community/useCommunityParams";
// import { usePostsV2 } from "@hooks/community/usePostsV2";
import { navLevelsV2 } from "@hooks/community/v2/useCommunityParamsV2";
// import { usePostsV3 } from "@hooks/community/v2/usePostsV3";
// import { useFeed } from "@hooks/feed/useFeed";
// import { UserRank } from "@models/Activities/Activity";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import PostsList from "@templates/feed/PostsList";
// import LeaderboardWrapper from "@templates/leaderboard/LeaderboardWrapper";
// import apper from "@templates/leaderboard/LeaderboardWrapper";
import clsx from "clsx";
// import PersonalKPIs from "../PersonalKPIs/PersonalKPIs";
// import ProgressV2 from "../PersonalKPIs/ProgressV2";
// import ProgressV2 from "../PersonalKPIs/ProgressV2";
// import ProgramV2 from "../Program/ProgramV2";
// import ProgramV3 from "../Program/ProgramV3";
import Thread from "../Thread/Thread";
import mixpanel from "@config/mixpanel";
import { useEffect } from "react";

interface Props {
  leader: LeaderBoard;
  selectedEvent?: EventInterface;
  signedInUser?: UserInterface;
  // joinURL: string;
  setParentPostId: (newId: string) => void;
  setAuthIsVisible: () => void;
  navState: navLevelsV2;
  postEventId?: string;
  parentPostId?: string;
  numClaps?: number;
  numCheckins?: number;
  leaderboard?: boolean;
  viewOnly?: boolean;
  // onNewPost: () => void;
  isMember: boolean;
  parentEvent?: EventInterface;

  // selectedLeaderboard: leaderboardKPIs;
  // onLeaderboardChange: (newL: leaderboardKPIs) => void;
  // myUserRank?: UserRank;
  // savedList: string[];

  onNavChange: (navLevel: navLevelsV2) => void;
  // nowIndex: number;
  // onProfileNameClick: (uid: string) => void;
  // leaderboardWeek?: leaderboardWeekTypes;
  // onLeaderboardWeekChange: (newWeek: leaderboardWeekTypes) => void;
  // onWorkoutClick: () => void;
}

const ProgramWrapperV2: React.FC<Props> = ({
  leader,
  selectedEvent,
  leaderboard,
  signedInUser,
  // joinURL,
  setAuthIsVisible,
  navState,
  // selectedCohortId,
  // numClaps,
  setParentPostId,
  postEventId,
  viewOnly,
  parentPostId,
  // onNewPost,
  isMember,
  parentEvent,
  // selectedLeaderboard,
  // onLeaderboardChange,
  // myUserRank,
  // savedList,
  // nowIndex,
  // onProfileNameClick,
  // leaderboardWeek,
  // onLeaderboardWeekChange,

  onNavChange,
}) => {
  // const { postId, onClickPost, onBack } = useFeed(
  // leader.uid,
  // signedInUser?.uid
  // );

  // console.log("leaderboard", leaderboard);
  const onClose = () => onNavChange("program");
  const onPost = () => {
    onNavChange("compose");

    mixpanel.track("start_post_click");
  };

  useEffect(() => {
    mixpanel.time_event("community_time");
    return () => {
      mixpanel.track("community_time");
    };
  }, []);

  return (
    <div className={clsx("flex", leaderboard ? "" : "bg-gray-100", "")}>
      <div
        className={clsx(
          navState === "program" || navState === "compose"
            ? // navState === "profile"
              viewOnly
              ? "w-full"
              : "w-full"
            : "hidden md:block"
        )}
      >
        {parentPostId && parentEvent?.id ? (
          <div>
            <Thread
              // selectedCohortId={""}
              // postEventId={postEventId}
              viewerUID={signedInUser?.uid}
              viewerImg={signedInUser?.profileImage}
              viewerName={signedInUser?.name}
              // leader={leader}
              // parentEventId={selectedEvent.parentId}
              isAdmin={signedInUser?.role === "admin"}
              postId={parentPostId}
              gameId={parentEvent.id}
              // joinURL={""}
              setAuthIsVisible={setAuthIsVisible}
              isMember={isMember}
            />
          </div>
        ) : signedInUser ? (
          // <ProgramV3
          //   leader={leader}
          //   selectedEvent={selectedEvent}
          //   postsV2={posts}
          //   onNext={onNext}
          //   navState={navState}
          //   nextExists={nextExists}
          //   user={signedInUser}
          //   communityId={leader.uid}
          //   isMember={isMember}
          //   selectedCohortId={""}
          //   setParentPostId={setParentPostId}
          //   setAuthIsVisible={setAuthIsVisible}
          //   parentEvent={parentEvent}
          //   onNavChange={onNavChange}
          // />
          <PostsList
            signedInUser={signedInUser}
            gameId={parentEvent?.id}
            isPosting={navState === "compose"}
            onClosePost={onClose}
            onPost={onPost}
            onClickPost={setParentPostId}
            baseTeamId={selectedEvent?.id}
            baseCommunityId={leader.uid}
          />
        ) : null}
      </div>
      {/* <div
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
      > */}
      {/* {selectedEvent?.parentId &&
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
        )} */}

      {/* {leaderboard ? (
          <div className="mt-2">
            <LeaderboardWrapper numEntries={2} />
          </div>
        ) : null} */}
    </div>
    // </div>
  );
};

export default ProgramWrapperV2;
