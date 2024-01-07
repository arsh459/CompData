import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Task } from "@models/Tasks/Task";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React from "react";
// import FinaleOverlay from "./FinaleOverlay";

interface Props {
  task: Task;
}
const FinaleMedia: React.FC<Props> = ({ task }) => {
  const media = task?.thumbnails as CloudinaryMedia | AWSMedia;

  return (
    <div className=" relative overflow-hidden  rounded-lg ">
      {media ? (
        <MediaTile
          media={media}
          alt="goal-task"
          height={179}
          width={353}
          rounded={true}
          roundedString="rounded-xl"

          //   thumbnail={user?.profileImage}
          // setIsPaused={() => {}}
          //   HWClassStr="max-h-[102px] max-w-[159]   rounded-xl"
          //   heightString="h-[102px] "
        />
      ) : (
        <div className="h-44" />
      )}
    </div>
  );
};

export default FinaleMedia;
