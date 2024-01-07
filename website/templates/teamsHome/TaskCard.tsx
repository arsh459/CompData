import { weEventTrack } from "@analytics/webengage/user/userLog";
import MediaCard from "@components/MediaCard";
import { Task } from "@models/Tasks/Task";
import { getTaskTotalFP } from "@templates/community/NewCommunitySection/utils";
import clsx from "clsx";
// import Link from "next/link";

interface Props {
  task: Task;
  userKey: string;
  eventKey: string;
  challengeName?: string;
}

const TaskCard: React.FC<Props> = ({
  task,
  userKey,
  eventKey,
  challengeName,
}) => {
  // console.log("hi");
  const summaryType: string = task.labels?.length ? task.labels[0] : "cardio";

  return (
    <a
      href={`/${userKey}/${eventKey}/workout?tab=task_preview&summaryType=${summaryType}&taskId=${task.id}`}
      // passHref
      onClick={() =>
        weEventTrack("teamsHome_taskClick", {
          taskName: task.name ? task.name : "no_taskName",
        })
      }
    >
      <div className="rounded-xl overflow-hidden relative cursor-pointer z-0">
        <MediaCard
          media={task.avatar}
          thumbnail={task.thumbnails}
          // setIsPaused={() => {}}
          HWClassStr="h-full w-fit mx-auto rounded-xl"
          heightString="h-[260px] iphoneX:h-[300px]"
        />
        <div
          className={clsx(
            "absolute inset-0 z-10",
            task.avatar?.resource_type === "video" ? "" : "bg-black/25"
          )}
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-2 h-1/3 text-white italic flex flex-col justify-end">
          <div className="bg-[#B9B9B9]/30 backdrop-blur-lg text-white p-2 rounded-t-md rounded-b-xl border border-[#C2C2C2]">
            <div className="font-bold flex justify-between items-center pb-2">
              <h3 className="line-clamp-1 text-sm iphoneX:text-base">
                {task.name}
              </h3>
            </div>
            <div className="flex justify-between items-center text-[10px] iphoneX:text-xs">
              {/* <div className="flex justify-center items-center">
                <img
                  src={`https://ik.imagekit.io/socialboat/Vector__15__l4k-N_U1T.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651150758250`}
                  alt="timer icon"
                  className="w-2.5 iphoneX:w-3"
                />
                <span className="pl-1">{task.durationMinutes} mins</span>
              </div> */}
              <div className="flex justify-center items-center">
                <img
                  src={`https://ik.imagekit.io/socialboat/Vector_6G6jKidRr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654940852073`}
                  alt="level icon"
                  className="w-2.5 iphoneX:w-3"
                />
                <span className="pl-1">Lvl {task.level ? task.level : 0}</span>
              </div>
              <div className="flex justify-center items-center pl-4">
                <img
                  src={`https://ik.imagekit.io/socialboat/Vector__11__5Mi_iTCJd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650966172454 text-sm iphoneX:text-base`}
                  alt="fitpoints icon"
                  className="w-2.5 iphoneX:w-3"
                />
                <span className="pl-1">
                  {getTaskTotalFP(task.awardLevels)} FP
                </span>
              </div>
            </div>
          </div>
        </div>
        {challengeName ? (
          <div className="absolute top-0 left-0 right-0 z-20 p-2 italic">
            <h2 className="iphoneX:text-lg bg-[#B9B9B9]/30 backdrop-blur-lg text-white text-center font-bold py-2 rounded-b-md rounded-t-xl border border-[#C2C2C2]">
              {challengeName}
            </h2>
          </div>
        ) : null}
      </div>
    </a>
  );
};

export default TaskCard;
