import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import ActivityCard from "@components/ActivityCard";
import React from "react";
import { useLastActivities } from "@hooks/activities/useLastActivities";
import { useUserPosts } from "@hooks/community/v2/useUserPosts";
// import { format } from "date-fns";

interface Props {
  uid: string;
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  canEdit?: boolean;
  color?: string;
  viewerId?: string;
  viewerIsCreator?: boolean;
}

const ActivitiesCardsJounral: React.FC<Props> = ({
  uid,
  img,
  name,
  canEdit,
  color,
  viewerId,
  viewerIsCreator,
}) => {
  const { posts } = useUserPosts(uid);
  console.log("posts", posts);
  const { onNext, activityList } = useLastActivities(uid);
  //   console.log("activityList", activityList);

  return (
    <div className="p-4 grid gap-4">
      {activityList
        //Object.keys(activities)
        //.slice(0)
        // .reverse()
        .map(
          (activity) => (
            //   activities[key].map((avtivity) =>
            //   (
            <ActivityCard
              key={activity.postId}
              uid={uid}
              img={img}
              name={name}
              canEdit={canEdit}
              //   date={format(new Date(avtivity.createdOn, ))}
              activity={activity}
              viewerId={viewerId}
              viewerIsCreator={viewerIsCreator}
            />
          )
          //   ))
        )}
      <button
        onClick={onNext}
        className="w-full py-2 rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        Show More
      </button>
    </div>
  );
};

export default ActivitiesCardsJounral;

/**
 * fetch posts
 * for each post, fetch activities
 * aggregate activities on user
 */
