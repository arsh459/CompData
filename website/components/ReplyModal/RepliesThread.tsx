import { usePostReview } from "@hooks/community/usePostReviews";
import { DocumentReference } from "firebase/firestore";
import { createNewPostRef } from "@templates/community/Program/Post/utils";
import CurrPost from "./CurrPost";
import { Post } from "@models/Posts/Post";

interface Props {
  currentPost: Post;
  signedInUserId?: string;
  postRef: DocumentReference;
  numInitialElements: number;
  viewLevel: "session" | "post" | "postReply";
  targetViewLevel: "session" | "post" | "postReply";
  setTargetPost: (val: Post) => void;
  setTargetPostRef: (val: DocumentReference) => void;
  setTargetViewLevel: (val: "session" | "post" | "postReply") => void;
}

const RepliesThread: React.FC<Props> = ({
  currentPost,
  signedInUserId,
  postRef,
  numInitialElements,
  viewLevel,
  targetViewLevel,
  setTargetPost,
  setTargetPostRef,
  setTargetViewLevel,
}) => {
  const { postReviews } = usePostReview(
    postRef,
    viewLevel !== "postReply",
    numInitialElements
  );

  // console.log("nextExists", nextExists);

  return (
    <>
      <CurrPost
        currentPost={currentPost}
        postRef={postRef}
        signedInUserId={signedInUserId}
        viewLevel={viewLevel}
        targetViewLevel={targetViewLevel}
        setTargetPost={setTargetPost}
        setTargetPostRef={setTargetPostRef}
        setTargetViewLevel={setTargetViewLevel}
      />
      {viewLevel !== "postReply" ? (
        <>
          {postReviews.map((each) => (
            <div key={each.id}>
              <RepliesThread
                currentPost={each}
                signedInUserId={signedInUserId}
                postRef={createNewPostRef(postRef, each.id)}
                numInitialElements={1}
                viewLevel={viewLevel === "session" ? "post" : "postReply"}
                targetViewLevel={targetViewLevel}
                setTargetPost={setTargetPost}
                setTargetPostRef={setTargetPostRef}
                setTargetViewLevel={setTargetViewLevel}
              />
            </div>
          ))}
        </>
      ) : null}
      {/* {viewLevel !== "postReply" && nextExists ? (
        <div onClick={onNext} className="flex justify-end items-center px-8">
          <p className="text-sm text-blue-800 cursor-pointer">Show More</p>
        </div>
      ) : null} */}
    </>
  );
};

export default RepliesThread;
