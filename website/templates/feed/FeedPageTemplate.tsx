import { UserInterface } from "@models/User/User";
import HeaderV2 from "@templates/community/Header/HeaderV2";
// import TopNav from "@templates/community/Program/TopNav/TopNav";
// import PostsList from "./PostsList";
// import { useRouter } from "next/router";
// import Script from "next/script";
import { useFeed } from "@hooks/feed/useFeed";
import Thread from "@templates/community/Thread/Thread";
import EventBrief from "@templates/community/Program/EventBrief/EventBrief";
import { EventInterface } from "@models/Event/Event";
import PostsList from "./PostsList";

interface Props {
  signedInUser: UserInterface;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  gameId?: string;
  game: EventInterface;
}

const FeedPageTemplate: React.FC<Props> = ({
  signedInUser,
  authStatus,
  gameId,
  game,
}) => {
  //   const router = useRouter();
  const { postId, onBack, onClickPost, isPosting, onCancelPost, onPost } =
    useFeed();

  return (
    <div className="max-w-xl relative mx-auto ">
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-100">
        <div className="bg-gray-100 top-0 w-full z-50 left-0 right-0 fixed">
          <HeaderV2
            onSignIn={() => {}}
            onGoBack={onBack}
            signedInUserName={signedInUser?.name}
            uid={signedInUser?.uid}
            authStatus={authStatus}
            signedInUserImage={signedInUser?.profileImage}
            signedInUserKey={signedInUser?.userKey}
          />
        </div>
      </div>

      <div className="h-20" />

      {postId ? null : (
        <>
          <div className="px-2 pb-2 bg-gray-100">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <EventBrief
                eventName={game.name}
                eventDescription={game.description}
                creatorName={""}
                creatorKey=""
                creatorUID={game.ownerUID}
              />
            </div>
          </div>

          {/* <div className="py-2 px-4 sticky top-16 z-50 bg-gray-100">
            <TopNav selectedNav={"program"} onChangeSubNav={() => {}} />
          </div> */}
        </>
      )}

      {postId && gameId ? (
        <>
          <Thread
            postId={postId}
            gameId={gameId}
            isAdmin={signedInUser.role === "admin" ? true : false}
            viewerUID={signedInUser.uid}
            viewerImg={signedInUser.profileImage}
            viewerName={signedInUser.name}
            isMember={true}
            setAuthIsVisible={() => {}}
          />
          {/* <div className="fixed bottom-24 right-4 z-50">
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
          </div> */}
        </>
      ) : gameId ? (
        <>
          <div className="pt-0 bg-gray-100 px-2">
            <PostsList
              signedInUser={signedInUser}
              gameId={gameId}
              onClickPost={onClickPost}
              isPosting={isPosting}
              onPost={onPost}
              onClosePost={onCancelPost}
              noBottomOffset={true}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FeedPageTemplate;
