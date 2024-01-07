import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import PostV4 from "./PostV4";
import { Post } from "@models/Posts/Post";
// import { usePostRefs } from "@hooks/community/usePostRefs";
import { usePostReview } from "@hooks/community/usePostReviews";
import NextButton from "../NextButton";
import PostV4 from "./PostV4";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { DocumentReference } from "firebase/firestore";
import { createNewPostRef } from "./utils";

interface Props {
  currentPost: Post;
  eventId?: string;
  parentPostId?: string;
  rounded: boolean;
  onClick: () => void;
  viewerUID?: string;
  viewerName?: string;
  viewerImg?: CloudinaryMedia | AWSMedia;
  authorUID: string;
  authorName?: string;
  authorImage?: CloudinaryMedia | AWSMedia;
  superParentPostId?: string;
  postRef: DocumentReference;
  // parentEventId?: string;
  pin?: boolean;
  viewLevel: "session" | "post" | "postReply";
  hidePostSection?: boolean;
  lineClamp?: number;
  communityId?: string;
  selectedCohortId: string;
  gameId?: string;
  joinURL: string;
  setAuthIsVisible: () => void;
  numInitialElements: number;
  hideNextButton?: boolean;
  showReplyCTA?: boolean;
  dontGetReplies?: boolean;
  isMember: boolean;
  isAdmin: boolean;
  prizes?: ListItem[];
  live?: boolean;
  // onProfileNameClick: (uid: string) => void;
}

const now = Date.now();

const PostWithReply: React.FC<Props> = (props) => {
  // const { currentPostRef } = usePostRefs(
  //   props.eventId,
  //   props.currentPost.id,
  //   props.parentPostId,
  //   props.superParentPostId
  // );

  // console.log("prop", props.eventId);

  const { postReviews, onNext, nextExists } = usePostReview(
    props.postRef,
    props.viewLevel !== "postReply", // stop recurssion
    props.numInitialElements
  );

  return (
    <>
      <PostV4 currentPostRef={props.postRef} {...props} />

      {postReviews.map((item) => {
        if (props.numInitialElements > 1 || now >= props.currentPost.updatedOn)
          return (
            <div key={item.id}>
              <PostWithReply
                live={true}
                postRef={createNewPostRef(props.postRef, item.id)}
                // parentEventId={props.parentEventId}
                isAdmin={props.isAdmin}
                showReplyCTA={
                  props.viewLevel === "session" ? props.showReplyCTA : false
                }
                parentPostId={props.currentPost.id}
                superParentPostId={props.parentPostId}
                communityId={props.communityId}
                setAuthIsVisible={props.setAuthIsVisible}
                selectedCohortId={props.selectedCohortId}
                gameId={item.gameId}
                currentPost={item}
                rounded={true}
                eventId={props.eventId}
                authorName={item.creatorName}
                authorImage={item.creatorImg}
                authorUID={item.creatorId}
                onClick={props.onClick}
                viewLevel={props.viewLevel === "session" ? "post" : "postReply"}
                joinURL={props.joinURL}
                viewerUID={props.viewerUID}
                viewerImg={props.viewerImg}
                viewerName={props.viewerName}
                pin={false}
                isMember={props.isMember}
                numInitialElements={
                  props.dontGetReplies
                    ? 0
                    : props.viewLevel === "session"
                    ? 10
                    : 0
                }
              />
            </div>
          );
      })}

      {!props.hideNextButton && props.viewLevel === "session" && nextExists ? (
        <div className="bg-white w-full">
          <NextButton onClick={onNext} />
        </div>
      ) : null}
    </>
  );
};

export default PostWithReply;
