import { usePostsV3 } from "@hooks/community/v2/usePostsV3";
import { UserInterface } from "@models/User/User";
import NextButton from "@templates/community/Program/NextButton";
import PostCreateModal from "@templates/community/Program/Post/PostCreateModal";
import PostWithReply from "@templates/community/Program/Post/PostWithReply";
// import clsx from "clsx";
import { getToPostTeamAndCommunity } from "./utils";

interface Props {
  signedInUser: UserInterface;
  gameId?: string;
  isPosting: boolean;
  onClickPost: (newId: string) => void;
  onClosePost: () => void;
  onPost: () => void;

  baseTeamId?: string;
  baseCommunityId?: string;
  noBottomOffset?: boolean;
}

const PostsList: React.FC<Props> = ({
  signedInUser,
  gameId,
  isPosting,
  onClickPost,
  onClosePost,
  onPost,
  baseCommunityId,
  baseTeamId,
  noBottomOffset,
}) => {
  const { posts, nextExists, onNext } = usePostsV3(
    // undefined,
    // signedInUser.uid,
    gameId
    // postId
  );

  const { teamId, communityId } = getToPostTeamAndCommunity(
    gameId,
    signedInUser.participatingInGameWithTeam,
    baseTeamId,
    baseCommunityId
  );

  // console.log("teamId", teamId, communityId);
  return (
    <div>
      <PostCreateModal
        authorImage={signedInUser.profileImage}
        isOpen={isPosting}
        onBackdrop={onClosePost}
        authorName={signedInUser.name ? signedInUser.name : ""}
        gameId={gameId ? gameId : ""}
        onClose={onClosePost}
        authorUID={signedInUser.uid}
        initalSessionType="post"
        communityId={communityId}
        eventId={teamId}
      />
      {console.log(posts)}
      {posts.map((item, index) => {
        return (
          <div key={item.post.id} className="pb-4">
            <PostWithReply
              currentPost={item.post}
              live={index < 5}
              postRef={item.ref}
              eventId={item.post.eventId}
              rounded={true}
              hideNextButton={true}
              showReplyCTA={true}
              authorName={item.post.creatorName}
              gameId={item.post.gameId}
              isMember={true}
              selectedCohortId=""
              authorImage={item.post.creatorImg}
              viewerUID={signedInUser.uid}
              isAdmin={signedInUser.role === "admin"}
              viewerName={signedInUser.name}
              viewerImg={signedInUser.profileImage}
              authorUID={item.post.creatorId}
              joinURL=""
              communityId={communityId}
              dontGetReplies={true}
              pin={true}
              viewLevel="session"
              numInitialElements={1}
              setAuthIsVisible={() => {}}
              onClick={() => onClickPost(item.post.id)}
            />
          </div>
        );
      })}
      {nextExists ? (
        <div className="w-full bg-white md:pb-0">
          <NextButton onClick={onNext} />
        </div>
      ) : null}
      <div className="fixed bottom-24 right-4 z-50">
        <div
          onClick={onPost}
          className="w-16 h-16 bg-blue-400 cursor-pointer rounded-full shadow-sm flex justify-center items-center"
        >
          <img
            className="w-8 h-8 object-cover"
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik03OC44MzMzMywxNC4zMzMzM3Y2NC41aC02NC41djE0LjMzMzMzaDY0LjV2NjQuNWgxNC4zMzMzM3YtNjQuNWg2NC41di0xNC4zMzMzM2gtNjQuNXYtNjQuNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
          />
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
};

export default PostsList;
