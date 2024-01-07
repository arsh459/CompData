import { SessionV2 } from "@models/Event/Event";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import LiveLabel from "@templates/liveVideo/LiveVideoHeader/LiveLabel";
import BadgeIcon from "./BadgeIcon";
// import { getAspectRatio } from "./getAspectRatio";
import { postButtonLabels } from "./PostSection";
import SessionMedia from "./SessionMedia";

interface Props {
  session: SessionV2;
  // onPostClick: () => void;
  onPostClick: (newPostLabel: postButtonLabels) => void;
}

const SessionView: React.FC<Props> = ({ session, onPostClick }) => {
  return (
    <div className="flex rounded-lg bg-white border">
      <div className="w-1/3">
        <SessionMedia session={session} />
      </div>
      <div className="w-2/3 p-2 px-4 flex flex-col justify-between">
        <div>
          <p className="text-gray-700 font-semibold">{session.name}</p>
          <p className="text-gray-500 text-sm font-medium">
            Day {session.dayNumber}
          </p>

          <p className="text-gray-500 text-sm">{session.description}</p>

          <div className="flex pb-1 pt-2 items-center">
            {session.sessionType === "live" ? (
              <LiveLabel text="Live session" noShadow={true} />
            ) : null}
            {session.free ? (
              <div className={session.live ? "pl-1" : ""}>
                <BadgeIcon text="Free" color="bg-blue-400" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="pt-2">
          {/* <PostSection
            // join={session.sessionType === "live"}
            // post={true}
            // upvote={true}
            // upvoted={true}
            justifySettings="justify-evenly"
            postButtons={postButtons}
            setPostLabel={onPostClick}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SessionView;

// const postButtons: PostButton[] = [
//   // {
//   //   text: "Upvote",
//   //   icon: "https://img.icons8.com/metro/26/000000/like.png",
//   //   selectedIcon: "https://img.icons8.com/ultraviolet/40/000000/like--v1.png",
//   //   selected: false,
//   //   key: 'upvote',
//   // },
//   // {
//   //   text: "Join",
//   //   icon: "https://img.icons8.com/ios/150/000000/zoom.png",
//   //   selectedIcon: "https://img.icons8.com/ios/150/000000/zoom.png",
//   //   selected: false,
//   //   key: 'upvote',
//   // },
//   {
//     text: "Post",
//     icon: "https://img.icons8.com/ios/100/000000/reply-arrow.png",
//     selectedIcon: "https://img.icons8.com/ios/100/000000/reply-arrow.png",
//     selected: false,
//     key: "post",
//   },
// ];
