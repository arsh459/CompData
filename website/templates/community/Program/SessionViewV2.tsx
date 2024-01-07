import { SessionV2 } from "@models/Event/Event";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import LiveLabel from "@templates/liveVideo/LiveVideoHeader/LiveLabel";
import clsx from "clsx";
import BadgeIcon from "./BadgeIcon";
// import { getAspectRatio } from "./getAspectRatio";
import { postButtonLabels } from "./PostSection";
import SessionMedia from "./SessionMedia";

interface Props {
  session: SessionV2;
  // onPostClick: () => void;
  unlocked?: boolean;
  onPostClick: (newPostLabel: postButtonLabels) => void;
}

const SessionViewV2: React.FC<Props> = ({ session, onPostClick, unlocked }) => {
  return (
    <div className="w-full flex rounded-lg bg-white shadow-md hover:shadow-lg ">
      {session.media ? (
        <div className="w-1/3">
          <SessionMedia session={session} unlocked={unlocked} />
        </div>
      ) : null}
      <div
        className={clsx(
          "p-2 px-4 flex flex-col justify-between",
          session.media ? "w-2/3 " : "w-full"
        )}
      >
        <div>
          <p className="text-gray-700 font-semibold line-clamp-1">
            {session.name}
          </p>
          <div className="flex items-center">
            {/**
            <p className="text-gray-500 text-sm font-medium">
              Day {session.dayNumber}
            </p>
             */}

            {session.sessionType === "live" ? (
              <div className="">
                <p className="text-red-500 text-sm font-medium">· Live</p>
              </div>
            ) : null}
          </div>

          <p className="text-gray-500 text-sm whitespace-pre-wrap">
            {session.description}
          </p>

          <div className="flex pb-1 pt-2 items-center">
            {session.sessionType === "live" && false ? (
              <LiveLabel text="Live session" noShadow={true} />
            ) : null}
            {session.free && false ? (
              <div className={session.live ? "pl-1" : ""}>
                <BadgeIcon text="Free" color="bg-blue-400" />
              </div>
            ) : null}
          </div>
        </div>
        {unlocked ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default SessionViewV2;

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
