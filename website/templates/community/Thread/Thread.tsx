import { usePinnedPost } from "@hooks/community/usePinnedPost";
// import { useSessionPosts } from "@hooks/community/useSessionPosts";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { Post } from "@models/Posts/Post";
// import NextButton from "../Program/NextButton";
// import PostV4 from "../Program/Post/PostV4";
import PostWithReply from "../Program/Post/PostWithReply";
// import { createNewPostRef } from "../Program/Post/utils";
// import SessionViewV3 from "../Program/SessionViewV3";
// import TopHeader from "./TopHeader";

interface Props {
  // onClick: () => void;
  // eventId: string;
  // parentEventId?: string;
  // leader: LeaderBoard;
  // selectedCohortId: string;
  // onProfileNameClick: (uid: string) => void;
  // postEventId: string;
  // postId: string;
  // onSubPostClick: (newId: string) => void;

  viewerUID?: string;
  viewerName?: string;
  viewerImg?: CloudinaryMedia | AWSMedia;
  // joinURL: string;
  setAuthIsVisible: () => void;

  // parentPostId?: string;
  isMember: boolean;
  isAdmin: boolean;
  postId: string;
  gameId: string;
}

const Thread: React.FC<Props> = ({
  // leader,
  // onClick,
  // eventId,
  // parentEventId,
  // onProfileNameClick,
  // postEventId,
  // onSubPostClick,
  // postId,
  viewerUID,
  viewerImg,
  viewerName,
  // selectedCohortId,
  // joinURL,
  setAuthIsVisible,
  // parentPostId,
  isMember,
  isAdmin,
  postId,
  gameId,
}) => {
  const { pinnedPost } = usePinnedPost(postId, gameId, true);

  // const { posts, onNext, nextExists } = useSessionPosts(
  //   eventId,
  //   parentPostId,
  //   3
  // );

  // const onSubPostClickWrapper = (post: Post) => {
  //   onSubPostClick(post.id);
  // };
  // console.log("pinned", pinnedPost);

  // const onBack = () => {
  //   onClick();
  // };
  return (
    <div className="min-h-screen">
      {/* <div>
        <TopHeader onClick={onBack} />
      </div> */}

      <div>
        {pinnedPost && pinnedPost.post && pinnedPost.ref ? (
          <PostWithReply
            communityId={pinnedPost?.post?.communityId}
            postRef={pinnedPost.ref}
            // onProfileNameClick={onProfileNameClick}
            // parentEventId={parentEventId}
            live={true}
            setAuthIsVisible={setAuthIsVisible}
            selectedCohortId={""}
            rounded={false}
            eventId={pinnedPost.post.eventId}
            currentPost={pinnedPost.post}
            authorName={pinnedPost.post.creatorName}
            authorImage={pinnedPost.post.creatorImg}
            authorUID={pinnedPost.post.creatorId}
            onClick={() => {}}
            isAdmin={isAdmin}
            viewLevel="session"
            joinURL=""
            gameId={pinnedPost.post.gameId}
            viewerUID={viewerUID}
            viewerImg={viewerImg}
            viewerName={viewerName}
            pin={true}
            numInitialElements={3}
            isMember={isMember}
          />
        ) : null}
      </div>

      <div className="h-24" />

      {/* {nextExists ? (
        <div className="bg-white w-full">
          <NextButton onClick={onNext} />
        </div>
      ) : null} */}
    </div>
  );
};

export default Thread;
