import LeaderboardPost from "./LeaderboardPost";
import PostV4, { PostProps } from "./PostV4";

const PostV4Wrapper: React.FC<PostProps> = (props) => {
  return (
    <>
      {props.currentPost.postContent === "leaderboard" &&
      props.currentPost.leaderboardEventId ? (
        <LeaderboardPost
          parentId={props.currentPost.leaderboardEventId}
          communityId={props.communityId ? props.communityId : ""}
        />
      ) : (
        <PostV4 {...props} />
      )}
    </>
  );
};

export default PostV4Wrapper;
