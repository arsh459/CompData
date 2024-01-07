import CardHeader from "./CardComponents/CardHeader";
import CardMedia from "./CardComponents/CardMedia";
import CardAction from "./CardComponents/CardAction";
import { Post } from "@models/Posts/Post";
import { useCommunityPost } from "@hooks/community/v2/useCommunityPost";
import { DocumentReference } from "firebase/firestore";
import {
  communityQueryV3,
  // modalTypes,
} from "@hooks/community/v2/useCommunityParamsV3";
// import TeamInteraction from "@templates/community/NewCommunitySection/TeamInteraction";
// import { useState } from "react";
import { UserInterface } from "@models/User/User";
import PostTypeSelector from "./PostTypeSelector";
import { isIButtonVisible } from "./utils";
import ModerationModal from "./ModerationModal";
import PlayerDetailsModal from "@templates/community/LeaderboardWrapper/PlayerDetailsModal";
import { useState } from "react";
import { useUserRank } from "@hooks/activities/userUserRank";
import { SprintObject } from "@models/Event/Event";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import CardMediaPrivate from "./CardComponents/CardMediaPrivate";
// import { useEffect } from "react";

interface Props {
  post: Post;
  postRef: DocumentReference;
  urlState: communityQueryV3;
  signedInUser: UserInterface;
  baseShareURL: string;
  // onGoBack: () => void;
  isPostClick?: boolean;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;

  communityId: string;
  eventId: string;
  gameId: string;
  totalFitPoints?: number;
  eventKey: string;
  teamKey: string;

  gameStarts?: number;
  sprints?: SprintObject[];
  isLive?: boolean;
  yesterday: string;
  dayBefore: string;
  onEditPost?: (post: Post) => void;
}

export type postModalTypes = "SCORE" | "REPORT" | "NONE";

const ProgramCard: React.FC<Props> = ({
  post,
  postRef,
  urlState,
  signedInUser,
  baseShareURL,
  totalFitPoints,
  isPostClick,
  onQueryChange,

  communityId,
  eventId,
  gameId,
  eventKey,
  teamKey,
  gameStarts,
  sprints,
  isLive,
  yesterday,
  dayBefore,
  onEditPost,
}) => {
  const { isActivity, fitPoints, activity, activityName, userLevel } =
    useCommunityPost(post);

  const [modalState, showModal] = useState<postModalTypes>("NONE");
  const { myUserRank } = useUserRank(
    modalState === "SCORE" ? gameId : "",
    post.creatorId
  );

  const shareURL: string = `${baseShareURL}?nav=program${
    urlState?.post ? `&postType=${urlState.post}` : ""
  }&postId=${post.id}`;

  const onModalClose = () => showModal("NONE");
  const onDotsClick = () => showModal("REPORT");
  const onNameClick = () => showModal("SCORE");

  // console.log(modalState);

  // console.log("post", post.creatorName, post.view);

  const handleQueryChange = (postId: string) => {
    // const query: communityQueryV3 = {};
    // query.nav = urlState.nav;
    // query.post = urlState.post;
    // query.postId = postId;
    // query.replies = replies;
    onQueryChange({
      ...urlState,
      postId: postId,
      // modal: modal,
      // replies: replies,
    });
  };

  const showDot: boolean =
    post.view === "private" ? post.creatorId === signedInUser.uid : true;
  // console.log("totalFitPoints", totalFitPoints);

  return (
    <div className="py-2.5 iphoneX:py-4">
      <CardHeader
        updatedOn={post.updatedOn}
        creatorName={post.creatorName}
        creatorImg={post.creatorImg}
        postType={post.postType}
        onDotsClick={onDotsClick}
        onNameClick={() => {
          onNameClick();
          weEventTrack("gameCommunity_othersProfileClick", {
            userName: post.creatorName ? post.creatorName : "no_userName",
          });
        }}
        teamName={post.teamName}
        dotsVisible={isPostClick && showDot}
        // isPostClick={isPostClick}
        // isUserActivity={activity?.authorUID === signedInUser.uid}
        // gameId={gameId}
        // actId={activity?.id ? activity.id : activity?.postId}
        // signedInUID={signedInUser.uid}
        // gameId={gameId}
        // leaderboardMonth={urlState.leaderboardMonth}
        // gameStarts={gameStarts}
        // sprints={sprints}
      />

      {post.view === "private" ? (
        <CardMediaPrivate
          post={post}
          activity={activity}
          activityName={activityName}
          fitPoints={fitPoints}
          totalFitPoints={totalFitPoints}
          userLevel={userLevel}
          signedInUID={signedInUser.uid}
          onEditPost={onEditPost}
          iButtonVisible={isIButtonVisible(activity)}
          onPostClick={() => {
            handleQueryChange(post.id);
            weEventTrack("gameCommunity_postIBtnClick", { postId: post.id });
          }}
          eventKey={eventKey}
          teamKey={teamKey}
          tryAgainURL={`/${teamKey}/${eventKey}/workout?taskId=${activity?.taskId}&postId=${post.id}&tab=post_workout`}
        />
      ) : (
        <CardMedia
          isActivity={isActivity}
          postType={post.postType}
          fitPoints={fitPoints}
          totalFitPoints={totalFitPoints}
          activityName={activityName}
          media={post.media}
          text={post.text}
          userLevel={userLevel}
          onPostClick={() => {
            handleQueryChange(post.id);
            weEventTrack("gameCommunity_postIBtnClick", { postId: post.id });
          }}
          isPostClick={isPostClick}
          iButtonVisible={isIButtonVisible(activity)}
          isUserActivity={activity?.authorUID === signedInUser.uid}
          reviewStatus={activity?.reviewStatus}
          activity={activity}
          signedInUID={signedInUser.uid}
          eventKey={eventKey}
          teamKey={teamKey}
          tryAgainURL={`/${teamKey}/${eventKey}/workout?taskId=${activity?.taskId}&postId=${post.id}&tab=post_workout`}
        />
      )}

      <CardAction
        numClaps={post.numClaps}
        numCheckins={post.numCheckins}
        uid={post.creatorId}
        isLive={isLive}
        postRef={postRef}
        currentPost={post}
        signedInUser={signedInUser}
        // modal={urlState.modal}
        // showReplies={urlState.replies && post.id === urlState.postId}
        shareURL={shareURL}
        // onPostClick={() => handleQueryChange(post.id, "comment")}
        // onGoBack={onGoBack}
        gameId={gameId}
        eventId={eventId}
        communityId={communityId}
      />

      {modalState === "REPORT" ? (
        <ModerationModal
          totalFitPoints={totalFitPoints}
          activity={activity}
          post={post}
          onClose={onModalClose}
          isOpen={modalState === "REPORT"}
          authorName={signedInUser.name ? signedInUser.name : "Ticket creator"}
          authorPhone={signedInUser.phone ? signedInUser.phone : "No Phone"}
          // isUserActivity={activity?.authorUID === signedInUser.uid}
          // authorId={activity.authorUID}
          ticketOwnerId={signedInUser.uid}
          tryAgainURL={`/${teamKey}/${eventKey}/workout?taskId=${activity?.taskId}&postId=${post.id}&tab=post_workout`}
          // actId={a}
          // reviewStatus={reviewStatus}
        />
      ) : null}

      {myUserRank ? (
        <PlayerDetailsModal
          isOpen={modalState === "SCORE"}
          onCloseModal={onModalClose}
          userRank={myUserRank}
          gameStarts={gameStarts}
          leaderboardMonth={urlState.leaderboardMonth}
          sprints={sprints}
          yesterday={yesterday}
          dayBefore={dayBefore}
        />
      ) : null}

      {signedInUser.role === "admin" && !isPostClick ? (
        <PostTypeSelector post={post} postRef={postRef} />
      ) : null}

      {/* <TeamInteraction
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eventId={post.eventId}
        teamName={post.teamName}
      /> */}
    </div>
  );
};

export default ProgramCard;
