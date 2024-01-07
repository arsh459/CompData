import { Activity } from "@models/Activities/Activity";
import { Post } from "@models/Posts/Post";
import { useState } from "react";
import Common from "./Common";
import Owner from "./Owner";
import PrivateMediaSwiper from "./PrivateMediaSwiper";

interface Props {
  post: Post;
  activity: Activity;
  activityName: string;
  fitPoints: number;
  totalFitPoints?: number;
  userLevel?: number;
  signedInUID: string;
  iButtonVisible: boolean;
  onEditPost?: (post: Post) => void;
  onPostClick: () => void;
  tryAgainURL: string;
  teamKey: string;
  eventKey: string;
}

const CardMediaPrivate: React.FC<Props> = ({
  post,
  activity,
  activityName,
  fitPoints,
  totalFitPoints,
  userLevel,
  signedInUID,
  iButtonVisible,
  onEditPost,
  onPostClick,
  tryAgainURL,
  teamKey,
  eventKey,
}) => {
  const isViewerAuthor = signedInUID === post.creatorId;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="text-white p-4 mt-4 relative z-0"
        style={{
          background:
            "linear-gradient(171.23deg, rgba(0, 0, 0) 7.39%, rgba(70, 39, 111, 0.448) 43.77%, rgba(158, 56, 136, 0.446566) 65.12%, rgba(248, 87, 109, 0.7) 97.84%)",
        }}
      >
        <Common
          activityName={activityName}
          activity={activity}
          fitPoints={fitPoints}
          totalFitPoints={totalFitPoints}
          userLevel={userLevel}
          iButtonVisible={iButtonVisible}
          onPostClick={onPostClick}
          tryAgainURL={tryAgainURL}
          teamKey={teamKey}
          eventKey={eventKey}
          signedInUID={signedInUID}
          postType={post.postType}
        />
        {isViewerAuthor ? (
          <Owner
            post={post}
            onEditPost={onEditPost}
            onViewMedia={() => setIsOpen(true)}
          />
        ) : null}
      </div>
      <PrivateMediaSwiper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        media={post.media}
      />
    </>
  );
};

export default CardMediaPrivate;
