import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { Activity } from "@models/Activities/Activity";
import clsx from "clsx";
// import Linkify from "react-linkify";

import CardHeader from "./CardHeader";
import CardSwiper from "./CardSwiper";
import CardActions from "./CardActions";
// import { usePostWithRef } from "@hooks/activities/usePostWithRef";
import { format } from "date-fns";
import { Post } from "@models/Posts/Post";
import { DocumentReference } from "firebase/firestore";
import { useActivityReview } from "@hooks/community/useActivityReview";
import { FIT_POINT_SHOW_TIME } from "@constants/gameStats";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import PrivateMedia from "@components/PrivateMedia";

interface Props {
  uid: string;
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  canEdit?: boolean;
  post: Post;
  postRef: DocumentReference;
  //   activity: Activity;
  viewerId?: string;
  text?: string;
  viewerIsCreator?: boolean;
}

const PostCard: React.FC<Props> = ({
  uid,
  img,
  name,
  text,
  canEdit,
  post,
  postRef,
  //   activity,
  viewerId,
  viewerIsCreator,
}) => {
  const { fitPoints, activityName } = useActivityReview(post.id, uid, true);
  //   console.log("pist", post.id);
  //   const fitPoints = (activity.calories ? activity.calories : 0) / 300;
  //   const fitPoints = 4;
  //   const activityName = "Activity name";
  // const cloriesToMin = fitPoints * 30;
  // const duration = intervalToDuration({
  //   start: 0,
  //   end: cloriesToMin * 60 * 1000,
  // });

  return (
    <div className="w-full italic text-[#A3A3A3] my-3">
      <CardHeader
        img={img}
        name={name}
        canEdit={canEdit}
        hasMedia={post?.media.length ? false : true}
      />
      <div
        className={clsx(
          "w-full max-w-full text-[#C5C5C5] rounded-lg border border-[#E3E3E3]",
          post?.media.length ? "" : "bg-gradient-to-b from-[#F2F2F7]"
        )}
      >
        {/* <div className="px-4 py-2">
          <p
            className={clsx(
              "line-clamp-2",
              "prose break-words",
              "whitespace-pre-wrap"
              // "text-gray-600 text-sm",
            )}
          >
            <Linkify>{text}</Linkify>
          </p>
        </div> */}
        <div
          className={clsx(
            "flex justify-between items-center p-2 rounded-t-lg",
            post?.media.length && "bg-gradient-to-b from-[#F2F2F7]"
          )}
        >
          <h3 className="text-lg capitalize font-bold">{activityName}</h3>
          <p className="text-base pl-2">
            {post.updatedOn
              ? format(new Date(post.updatedOn), "dd/MM/yyyy")
              : ""}
          </p>
          {/* {duration.seconds || duration.minutes || duration.hours ? (
            <p className="text-xl">
              {`~ ${duration.hours ? duration.hours : "00"}:${
                duration.minutes ? duration.minutes : "00"
              }:${duration.seconds ? duration.seconds : "00"}`}
            </p>
          ) : null} */}
        </div>
        {post?.view === "private" && !canEdit ? (
          <PrivateMedia />
        ) : (
          <CardSwiper
            postMedia={post?.media}
            pointsVisible={post.updatedOn > FIT_POINT_SHOW_TIME}
            gameName={getGameNameReadable(post.gameId)}
            date={
              "" //post.updatedOn ? format(new Date(post.updatedOn), "dd/MM/yyyy") : ""
            }
            fitPoints={fitPoints}
          />
        )}
      </div>
      {post ? (
        <CardActions
          currentPost={post}
          postRef={postRef}
          // avtivity={activity}
          uid={uid}
          clapperId={viewerId}
          isClapperCreator={viewerIsCreator}
        />
      ) : null}
    </div>
  );
};

export default PostCard;
