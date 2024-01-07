import clsx from "clsx";
import MediaCard from "@components/MediaCard";
import UserImage from "@templates/listing/Header/UserImage";
import { TaskDoneType } from "@hooks/community/useTaskDoneLists";
import PrivateMedia from "@components/PrivateMedia";
// import { useState } from "react";

interface Props {
  item: TaskDoneType;
  handleQueryChange: (postId: string) => void;
}

const TaskDoneMedia: React.FC<Props> = ({ item, handleQueryChange }) => {
  // const [isPaused] = useState<boolean>(true);

  return (
    <div
      className="relative z-0 rounded-2xl overflow-hidden"
      onClick={() => handleQueryChange(item.id)}
    >
      <div className="h-52 iphoneX:h-60 bg-[#292929] flex justify-center items-center">
        {item.view === "private" ? (
          <PrivateMedia
            heightStr="h-full"
            imgSizeStr="w-4 h-4 iphoneX:w-5 iphoneX:h-5"
            textSizeStr="text-sm iphoneX:text-lg"
          />
        ) : (
          <MediaCard
            media={item.media}
            // setIsPaused={setIsPaused}
            HWClassStr="h-full w-fit rounded-2xl"
          />
        )}
      </div>

      {/* {isPaused ? ( */}
      <div
        className={clsx(
          "absolute top-0 left-0 right-0 z-10 h-1/5 p-2",
          "bg-gradient-to-b from-[#292929] to-transparent pointer-events-none",
          "flex justify-between items-start text-white font-bold text-sm iphoneX:text-base"
        )}
      >
        <div className="flex items-center">
          <img
            src={`https://ik.imagekit.io/socialboat/Vector__11__5Mi_iTCJd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650966172454`}
            alt="Fitpoints Icon"
            className="w-4"
          />
          <div className="pl-2">{item.earnedFP} FP</div>
        </div>

        <div className="flex items-center">
          <img
            src={`https://ik.imagekit.io/socialboat/Ellipse_178_fH10R76Qkq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984146252`}
            alt="Level Icon"
            className="w-4"
          />
          <p className="pl-2">lvl {item.userLvl ? item.userLvl : 0}</p>
        </div>
      </div>
      {/* ) : null} */}

      {/* {isPaused ? ( */}
      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 z-10 h-1/5 p-2",
          "bg-gradient-to-t from-[#292929] to-transparent pointer-events-none",
          "flex justify-between items-end text-white font-bold text-sm iphoneX:text-base"
        )}
      >
        <div className="flex flex-none items-center">
          <UserImage
            image={item.userImg}
            name={item.userName}
            pointer="cursor-default"
            boxWidth="w-6"
            boxHeight="h-6"
          />
          <p className="pl-2 line-clamp-1">{item.userName}</p>
        </div>
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default TaskDoneMedia;
