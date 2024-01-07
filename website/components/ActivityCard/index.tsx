import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Activity } from "@models/Activities/Activity";
import clsx from "clsx";

import CardHeader from "./CardHeader";
import CardSwiper from "./CardSwiper";
import CardActions from "./CardActions";
import { usePostWithRef } from "@hooks/activities/usePostWithRef";
import { format, intervalToDuration } from "date-fns";

interface Props {
  uid: string;
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  canEdit?: boolean;
  //   date: string;
  activity: Activity;
  viewerId?: string;
  viewerIsCreator?: boolean;
}

const ActivityCard: React.FC<Props> = ({
  uid,
  img,
  name,
  canEdit,
  //   date,
  activity,
  viewerId,
  viewerIsCreator,
}) => {
  const { post } = usePostWithRef(activity.postRef);
  const fitPoints = (activity.calories ? activity.calories : 0) / 300;
  const cloriesToMin = fitPoints * 30;
  const duration = intervalToDuration({
    start: 0,
    end: cloriesToMin * 60 * 1000,
  });

  if (post || fitPoints) {
    return (
      <div className="grid gap-2 italic text-[#A3A3A3] my-3">
        <CardHeader
          img={img}
          name={name}
          canEdit={canEdit}
          hasMedia={post?.media.length ? false : true}
        />
        <div
          className={clsx(
            "w-[calc(100vw-2rem)] max-w-xl text-[#C5C5C5] rounded-lg border border-[#E3E3E3]",
            post?.media.length ? "" : "bg-gradient-to-b from-[#F2F2F7]"
          )}
        >
          <div
            className={clsx(
              "flex justify-between items-center p-2 rounded-t-lg",
              post?.media.length && "bg-gradient-to-b from-[#F2F2F7]"
            )}
          >
            <h3 className="text-xl font-bold">{activity.activityName}</h3>
            <p className="text-xl">
              {/** AMITABH: format the string */}
              {`~ ${duration.hours ? duration.hours : "00"}:${
                duration.minutes ? duration.minutes : "00"
              }:${duration.seconds ? duration.seconds : "00"}`}
            </p>
          </div>
          <CardSwiper
            postMedia={post?.media}
            date={
              activity.createdOn
                ? format(new Date(activity.createdOn), "dd/MM/yyyy")
                : ""
            }
            fitPoints={fitPoints}
          />
        </div>
        {post ? (
          <CardActions
            currentPost={post}
            postRef={activity.postRef}
            // avtivity={activity}
            uid={uid}
            clapperId={viewerId}
            isClapperCreator={viewerIsCreator}
          />
        ) : null}
      </div>
    );
  } else {
    return null;
  }
};

export default ActivityCard;
