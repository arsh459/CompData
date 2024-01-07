import clsx from "clsx";
import MediaCard from "@components/MediaCard";
import UserImage from "@templates/listing/Header/UserImage";
import { useState } from "react";
import { Task } from "@models/Tasks/Task";
import { getTaskTotalFP } from "../NewCommunitySection/utils";
import { Link } from "@mui/material";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  task: Task;
  baseShareURL: string;
}

const TaskSwiper: React.FC<Props> = ({ task, baseShareURL }) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <Link
      href={`${baseShareURL}/workout?tab=task_preview&summaryType=${
        task?.labels?.length ? task.labels[0] : "cardio"
      }&taskId=${task?.id}`}
      onClick={() =>
        weEventTrack("gameLeaderboard_suggestedTaskClick", {
          taskName: task.name ? task.name : "no_taskName",
        })
      }
    >
      <div className="relative z-0 rounded-2xl overflow-hidden">
        <div className="h-56 iphoneX:h-64 bg-[#6e6e6e] flex justify-center items-center">
          <MediaCard
            media={task.avatar}
            setIsPaused={(val) => setIsPaused(val)}
            HWClassStr="h-full w-fit rounded-2xl"
          />
        </div>

        {isPaused ? (
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
              <div className="pl-2">{getTaskTotalFP(task.awardLevels)} FP</div>
            </div>

            <div className="flex items-center">
              <img
                src={`https://ik.imagekit.io/socialboat/Ellipse_178_fH10R76Qkq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984146252`}
                alt="Level Icon"
                className="w-4"
              />
              <p className="pl-2">lvl {task.level ? task.level : 0}</p>
            </div>
          </div>
        ) : null}

        {isPaused ? (
          <div
            className={clsx(
              "absolute bottom-0 left-0 right-0 z-10 h-1/5 p-2",
              "bg-gradient-to-t from-[#292929] to-transparent pointer-events-none",
              "flex justify-between items-end text-white font-bold text-sm iphoneX:text-base"
            )}
          >
            <div className="flex items-center">
              <UserImage
                image={task.thumbnails}
                name={task.name}
                pointer="cursor-default"
                boxWidth="w-6"
                boxHeight="h-6"
                unknown={!task.thumbnails && !task.name}
              />
              <p className="pl-2 line-clamp-1">{task.name}</p>
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default TaskSwiper;
