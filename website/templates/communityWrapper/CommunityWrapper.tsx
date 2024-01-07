import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Post } from "@models/Posts/Post";
import PostV4 from "@templates/community/Program/Post/PostV4";
// import SessionViewV3 from "@templates/community/Program/SessionViewV3";

interface Props {}

const CommunityWrapper: React.FC<Props> = ({}) => {
  return (
    <div className="p-4 pl-0 pr-0 pt-0 bg-white">
      <div></div>
      <div>
        <PostV4
          eventId=""
          // parentEventId=""
          isMember={false}
          isAdmin={false}
          // onProfileNameClick={() => {}}
          // sessionId=""
          // postId="post"
          // childPostId=""
          rounded={true}
          onClick={() => {}}
          currentPost={
            {
              text: "Hi, today is the demo day. Use the 3 step process I taught you in live",
              id: "",

              media: [
                {
                  resource_type: "image",
                  public_id:
                    "v1635326261/58-3567150-Headstand-GIF-d2e934afa8224f9cbe436c8bbe59ea0d_xirmuv",
                  path: "v1635326261/58-3567150-Headstand-GIF-d2e934afa8224f9cbe436c8bbe59ea0d_xirmuv.gif",
                  format: "gif",
                  width: 735,
                  height: 490,
                },
              ] as CloudinaryMedia[],
            } as Post
          }
          // media={
          //   [

          // }
          authorUID={""}
          authorName="Hemant"
          // text="Hi, today is the demo day. Use the 3 step process I taught you in live"
          viewLevel="session"
          communityId=""
          selectedCohortId=""
          // day={3}
          pin={true}
          // sessionName="Headstand day"
          joinURL="https://zoom.us"
          setAuthIsVisible={() => {}}
          // onSubPostClick={() => {}}
        />
      </div>
    </div>
  );
};

export default CommunityWrapper;
