import { useSessionV3 } from "@hooks/community/useSessionV3";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import ClapSection from "@templates/community/Program/ClapSection";
import PostContentWrapper from "@templates/community/Program/Post/Content/PostContentWrapper";
import TopPostHeader from "@templates/community/Program/Post/TopHeader/TopHeader";
import {
  getBgForPost,
  getPaddingForPost,
} from "@templates/community/Program/Post/utils";
import PostSection from "@templates/community/Program/PostSection";
import { getPostIcons } from "@templates/community/Program/utils/utils";
import PostModals from "./Modals/PostModals";
import { Post } from "@models/Posts/Post";
import { DocumentReference } from "@firebase/firestore";
import { useActivityReview } from "@hooks/community/useActivityReview";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";

export interface PostProps {
  currentPostRef?: DocumentReference;
  currentPost: Post;
  eventId?: string;
  rounded: boolean;
  onClick: () => void;
  viewerUID?: string;
  viewerName?: string;
  viewerImg?: CloudinaryMedia | AWSMedia;
  authorUID: string;
  authorName?: string;
  authorImage?: CloudinaryMedia | AWSMedia;
  pin?: boolean;
  viewLevel: "session" | "post" | "postReply";
  hidePostSection?: boolean;
  lineClamp?: number;
  communityId?: string;
  selectedCohortId: string;
  joinURL: string;
  setAuthIsVisible: () => void;
  showReplyCTA?: boolean;
  isMember: boolean;
  isAdmin: boolean;
  // parentEventId?: string;
  prizes?: ListItem[];
  gameId?: string;
  live?: boolean;
  // authorKey: string;
  // onProfileNameClick: (uid: string) => void;

  // postContent?: "leaderboard";
  // leaderboardEventId?: string;
}

const PostV4: React.FC<PostProps> = ({
  currentPostRef,
  authorName,
  authorImage,
  currentPost,
  eventId,
  authorUID,
  onClick,
  rounded,
  lineClamp,
  showReplyCTA,
  pin,
  viewLevel,
  viewerUID,
  viewerImg,
  live,
  viewerName,
  hidePostSection,
  communityId,
  selectedCohortId,
  joinURL,
  setAuthIsVisible,
  isMember,
  isAdmin,
  // parentEventId,
  prizes,
  gameId,
  // authorKey,
  // onProfileNameClick,
}) => {
  const {
    clapper,
    checkedIns,
    currentVisible,
    onCloseModal,
    onAddNewPost,
    onDeletePost,
    onEditPost,
    onShowClaps,
    deleteCurrentPost,
    onJoinRequest,
    onReviewPost,
  } = useSessionV3(currentPostRef, viewLevel, viewerUID);

  const { adminReview, selectedReview, setSelectedReview, fitPoints } =
    useActivityReview(currentPostRef?.id, authorUID, viewerUID ? true : false);

  // console.log("adminReview", adminReview);

  // console.log("gameId", gameId, isAdmin, eventId);

  return (
    <>
      <PostModals
        postRef={currentPostRef}
        // parentEventId={eventId}
        eventId={eventId}
        gameId={gameId}
        // onProfileNameClick={onProfileNameClick}
        modalOpen={currentVisible}
        onCloseModal={onCloseModal}
        authorUID={authorUID}
        viewerUID={viewerUID}
        viewerImg={viewerImg}
        adminReview={selectedReview}
        viewerName={viewerName}
        authorName={authorName}
        authorImg={authorImage}
        text={currentPost.text}
        createdOn={1}
        currentPost={currentPost}
        communityId={communityId}
        selectedCohortId={selectedCohortId}
        joinURL={joinURL}
        setAuthIsVisible={setAuthIsVisible}
        deleteCurrentPost={deleteCurrentPost}
      />
      <div
        className={clsx(
          rounded ? "rounded-t-lg" : "",
          "border-t",
          getBgForPost(viewLevel),
          getPaddingForPost(viewLevel),
          "hover:shadow-xl"
        )}
      >
        <TopPostHeader
          viewerUID={viewerUID}
          onCommentClick={onClick}
          isAdmin={isAdmin}
          // authorKey={authorKey}
          // onProfileNameClick={onProfileNameClick}
          authorUID={authorUID}
          onEditClick={onEditPost}
          onDeleteClick={onDeletePost}
          authorName={authorName}
          teamName={currentPost.teamName}
          authorImage={authorImage}
          viewLevel={viewLevel}
          updatedOn={currentPost.updatedOn}
          communityId={communityId}
          showReplyCTA={showReplyCTA}
        />
        <PostContentWrapper
          onClick={onClick}
          text={currentPost.text}
          live={currentPost.sessionType === "live"}
          media={currentPost.media}
          pin={pin}
          viewLevel={viewLevel}
          lineClamp={lineClamp}
          parentId={currentPost.leaderboardEventId}
          communityId={communityId}
          postContent={currentPost.postContent}
          prizes={prizes}
          postView={currentPost.view}
          isViewerOwner={currentPost.creatorId === viewerUID}
        />
      </div>

      {hidePostSection ? null : (
        <div
          className={clsx(
            "pt-2",
            getBgForPost(viewLevel),
            rounded ? "rounded-b-lg" : "",
            "border-b",
            pin
              ? "pl-4 pr-4"
              : viewLevel === "post"
              ? "pl-20 pr-4"
              : viewLevel === "postReply"
              ? "ml-10 pl-4 pr-4"
              : "pl-4 pr-4"
          )}
        >
          <div className={clsx()}>
            <div className="pb-1">
              <ClapSection
                numClaps={
                  !live
                    ? (currentPost.numClaps ? currentPost.numClaps : 0) +
                      (clapper?.numClaps ? clapper?.numClaps : 0)
                    : currentPost.numClaps
                }
                numCheckins={currentPost.numCheckins}
                checkinClick={onClick}
                onReviewClick={onReviewPost}
                setSelectedReview={setSelectedReview}
                onClapClick={onShowClaps}
                isAdmin={isAdmin ? true : false}
                adminReview={adminReview}
                fitPoints={fitPoints}
              />
            </div>
            <PostSection
              postRef={currentPostRef}
              clapsByViewer={clapper?.numClaps}
              checkedIns={checkedIns}
              justifySettings="justify-evenly"
              postButtons={getPostIcons(
                currentPost.sessionType === "live",
                pin,
                viewLevel
              )}
              authorUID={authorUID}
              viewerUID={viewerUID}
              viewerImg={viewerImg}
              viewerName={viewerName}
              authorName={authorName}
              authorImg={authorImage}
              communityId={communityId}
              joinURL={joinURL}
              setAuthIsVisible={setAuthIsVisible}
              onJoinRequest={onJoinRequest}
              onPostClick={onAddNewPost}
              isMember={isMember}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostV4;
