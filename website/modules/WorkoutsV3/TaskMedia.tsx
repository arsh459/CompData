import { useState } from "react";
import clsx from "clsx";
// import { trendingIcon } from "@constants/icons";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  baseImageKit,
  // clapIconWhite,
  fPointsWhite,
  watchIconWhite,
} from "@constants/icons/iconURLs";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
import MediaCard from "@components/MediaCard";

interface Props {
  media?: CloudinaryMedia | AWSMedia;
  thumbnails?: CloudinaryMedia | AWSMedia;
  taskName?: string;
  uid?: string;
  fitPoints?: number;
  level?: number;
  taskDuration?: number;
}

const TaskMedia: React.FC<Props> = ({
  media,
  thumbnails,
  taskName,
  uid,
  fitPoints,
  taskDuration,
  level,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const { leader } = useLeaderboard(uid);

  //   console.log("leader", leader);

  return (
    <div className="w-full min-h-[15rem] bg-[#E1E1E1] rounded-xl relative z-0 overflow-hidden">
      {media ? (
        <MediaCard
          media={media}
          thumbnail={thumbnails}
          setIsPaused={setIsPaused}
          webEngageEventname="startWorkout_taskPreviewPlayClick"
        />
      ) : null}

      {isPaused ? (
        <div
          className={clsx(
            "absolute h-1/3 top-0 left-0 right-0 z-10 rounded-t-xl pt-2 text-white",
            "bg-gradient-to-b from-black/60 pointer-events-none"
          )}
        >
          <div className="flex justify-between items-start h-max px-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-extrabold pr-2 line-clamp-1">
                {taskName}
              </p>
              {/* <img src={trendingIcon} alt="Trending Icon" /> */}
            </div>
            <div className="flex justify-between items-center">
              <img
                src={`${baseImageKit}/tr:w-20,c-maintain_ratio/${fPointsWhite}`}
                alt="Fit Point Icon"
              />
              <p className="text-xl font-extrabold pl-2">
                {fitPoints ? fitPoints : 0}FP
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center h-max px-4">
            <div className="flex justify-between items-center">
              <img
                src={`${baseImageKit}/tr:w-14,c-maintain_ratio/${watchIconWhite}`}
                alt="Timer Icon"
              />
              <p className="pl-1 pt-0.5">
                {taskDuration ? taskDuration : 0} mins
              </p>
            </div>
            <p>Lvl {level ? level : 0}</p>
          </div>
        </div>
      ) : null}
      {isPaused ? (
        <div
          className={clsx(
            "absolute h-1/3 bottom-0 left-0 right-0 z-10 rounded-b-xl",
            "bg-gradient-to-t from-black/60 text-white pointer-events-none",
            "flex justify-between items-end px-4 pb-2"
          )}
        >
          <div className="flex justify-between items-center">
            <UserPhoto
              name={leader?.name ? leader.name : "Coach"}
              onImgClick={() => {}}
              size="xs"
              nameInvisible={true}
              img={leader?.profileImage}
            />
            <p className="text-2xl font-extrabold pl-2">
              {leader?.name ? leader.name : "Coach"}
            </p>
          </div>
          {/* <div className="flex justify-between items-center">
            <img
              src={`${baseImageKit}/tr:w-16,c-maintain_ratio/${clapIconWhite}`}
              alt="Clap Icon"
            />
            <p className="pl-1 pt-0.5">59</p>
          </div> */}
        </div>
      ) : null}
    </div>
  );
};

export default TaskMedia;
