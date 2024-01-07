import { usePosts } from "@hooks/community/usePosts";
import { Post } from "@models/Posts/Post";
import { UserInterface } from "@models/User/User";
import { useState } from "react";
import { postButtonLabels } from "../PostSection";
import PostView from "./PostView/PostView";

// import ReviewCreate from "./ReviewCreate";

interface Props {
  eventId: string;
  communityId: string;
  communityVisibility: boolean;
  user?: UserInterface;
  selectedCohortId: string;
}

const Feed: React.FC<Props> = ({
  eventId,
  communityId,
  user,
  selectedCohortId,
  communityVisibility,
}) => {
  // console.log("selectedCohortId", selectedCohortId, eventId);

  const { posts } = usePosts(eventId);
  // const [postLabel, setPostLabel] = useState<postButtonLabels>("none");
  const [replyingToPost, setReplyingToPost] = useState<Post>();

  return (
    <div className="">
      {user && replyingToPost ? (
        <div />
      ) : // <ReviewCreate
      //   communityId={communityId}
      //   isOpen={postLabel !== "none"}
      //   onCloseModal={() => setPostLabel("none")}
      //   eventId={eventId}
      //   heading="Review Post"
      //   userId={user.uid}
      //   userName={user.name}
      //   creatorImg={user.profileImage}
      //   view="public"
      //   parentPostId={replyingToPost.id}
      //   parentSessionId={replyingToPost.sessionId}
      //   parentSessionName={replyingToPost.sessionName}
      //   allowScore={user?.uid === communityId}
      //   selectedCohortId={selectedCohortId}
      // />
      null}

      {posts.map((post) => {
        // console.log("post", post.cohortId);
        if (
          (communityVisibility ||
            post.creatorId === user?.uid || // creator of post
            post.creatorId === communityId || // instructor post
            user?.uid === communityId) && // is instructor
          post.cohortId === selectedCohortId
        ) {
          return (
            <div key={post.id} className="pb-4">
              <PostView
                post={post}
                communityId={communityId}
                setPostLabel={(label: postButtonLabels) => {
                  setReplyingToPost(post);
                  // setPostLabel(label);
                }}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Feed;
