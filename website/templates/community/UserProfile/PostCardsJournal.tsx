import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import ActivityCard from "@components/ActivityCard";
import React from "react";
// import { useLastActivities } from "@hooks/activities/useLastActivities";
import { useUserPosts } from "@hooks/community/v2/useUserPosts";
import PostCard from "@components/ActivityCard/PostCard";
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

const PostCardsJournal: React.FC<Props> = ({
  uid,
  img,
  name,
  canEdit,
  color,
  viewerId,
  viewerIsCreator,
}) => {
  //   console.log("viewerId", viewerId);
  const { posts, onNext } = useUserPosts(uid);
  //   console.log("posts", posts);
  //   const { onNext, activityList } = useLastActivities(uid);
  //   console.log("activityList", activityList);

  return (
    <>
      {viewerId ? (
        <div className="p-4 border">
          {posts
            //Object.keys(activities)
            //.slice(0)
            // .reverse()
            .map(
              (post) => (
                //   activities[key].map((avtivity) =>
                //   (

                <div key={post.post.id} className="pb-2">
                  {post.post.media.length > 0 ? (
                    <PostCard
                      uid={uid}
                      text={post.post.text}
                      img={img}
                      name={name}
                      canEdit={canEdit}
                      post={post.post}
                      postRef={post.ref}
                      //   date={format(new Date(avtivity.createdOn, ))}
                      //activity={activity}
                      viewerId={viewerId}
                      viewerIsCreator={viewerIsCreator}
                    />
                  ) : null}
                </div>
              )
              //   ))
            )}
          <button
            onClick={onNext}
            className="w-full py-2 rounded-lg text-white text-lg"
            style={{ backgroundColor: color }}
          >
            Show More
          </button>
        </div>
      ) : null}
    </>
  );
};

export default PostCardsJournal;

/**
 * fetch posts
 * for each post, fetch activities
 * aggregate activities on user
 */
