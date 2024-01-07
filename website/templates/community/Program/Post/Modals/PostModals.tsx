import DialogBox from "@components/dialog/Dialog";
import { DocumentReference } from "@firebase/firestore";
import { Activity } from "@models/Activities/Activity";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Post } from "@models/Posts/Post";
import ClapModal from "../../ClapModal";
import ReviewCreate from "../../Feed/ReviewCreate";
import ReviewModal from "./ReviewModal";

export type postModals =
  | "delete"
  | "claps"
  | "newPost"
  | "editPost"
  | "joinRequest"
  | "reviewPost"
  | "none";

interface Props {
  postRef?: DocumentReference;
  modalOpen: postModals;
  onCloseModal: () => void;
  signedInUID?: string;
  eventId?: string;
  // parentEventId?: string;
  authorUID: string;

  // viewer
  viewerUID?: string;
  viewerName?: string;
  viewerImg?: CloudinaryMedia | AWSMedia;

  gameId?: string;

  authorName?: string;
  authorImg?: CloudinaryMedia | AWSMedia;
  text?: string;
  createdOn: number;
  dayNumber?: number;
  sessionName?: string;
  communityId?: string;
  selectedCohortId: string;
  joinURL?: string;
  setAuthIsVisible: () => void;
  deleteCurrentPost: () => void;
  authorKey?: string;

  currentPost: Post;
  adminReview?: Activity;
  // onProfileNameClick: (uid: string) => void;
}

const PostModals: React.FC<Props> = ({
  postRef,
  modalOpen,
  onCloseModal,
  signedInUID,
  eventId,
  communityId,
  viewerName,
  viewerImg,
  authorUID,
  authorName,
  // parentEventId,
  authorImg,
  selectedCohortId,
  gameId,
  text,
  createdOn,
  dayNumber,
  viewerUID,
  sessionName,
  currentPost,
  deleteCurrentPost,
  setAuthIsVisible,
  adminReview,
  authorKey,
  // onProfileNameClick,
}) => {
  return (
    <>
      {modalOpen === "claps" ? (
        <ClapModal
          postRef={postRef}
          isOpen={true}
          onCloseModal={onCloseModal}
          heading="Claps"
          signedInUID={signedInUID}
          // authorKey={authorKey}
          // authorUID={authorUID}
          // onProfileNameClick={onProfileNameClick}
        />
      ) : modalOpen === "newPost" || modalOpen === "editPost" ? (
        <ReviewCreate
          postRef={postRef}
          isOpen={true}
          onCloseModal={onCloseModal}
          editingPost={currentPost}
          editFlag={modalOpen === "editPost"}
          gameId={gameId}
          heading=""
          communityId={communityId}
          eventId={eventId}
          userName={viewerName}
          view="public"
          creatorImg={viewerImg}
          selectedCohortId={selectedCohortId}
          replyingTo={{
            authorUID,
            authorName,
            authorImg,
            text,
            createdOn,
            dayNumber,
            sessionName,
          }}
          authorDetails={{
            uid: viewerUID,
            name: viewerName,
            img: viewerImg,
          }}
        />
      ) : modalOpen === "delete" ? (
        <DialogBox
          heading="Delete post?"
          buttonLeftText="Delete"
          buttonRightText="Cancel"
          explainer="This will permanently delete the post"
          isOpen={true}
          leftClick={deleteCurrentPost}
          rightClick={onCloseModal}
          closeModal={onCloseModal}
        />
      ) : modalOpen === "joinRequest" ? (
        <DialogBox
          heading="Join the boat!"
          buttonLeftText="Join"
          buttonRightText="Cancel"
          explainer="To perform this action, you must join the boat"
          isOpen={true}
          leftClick={setAuthIsVisible}
          rightClick={onCloseModal}
          closeModal={onCloseModal}
        />
      ) : modalOpen === "reviewPost" && postRef?.id ? (
        <ReviewModal
          postId={postRef.id}
          postRef={postRef}
          gameId={gameId}
          isOpen={true}
          authorUID={authorUID}
          onCloseModal={onCloseModal}
          editFlag={adminReview ? true : false}
          heading=""
          cohortId={selectedCohortId}
          adminReview={adminReview}
        />
      ) : null}
    </>
  );
};

export default PostModals;
