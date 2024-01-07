import {
  arrowRightWhite,
  playIconBlack,
  proIconBlack,
  springIconWhiteFrame16,
  timeIconWhiteFrame16,
} from "@constants/icons/iconURLs";
import { Task } from "@models/Tasks/Task";
import ProgressBarDynamic from "@modules/WorkoutsV3/ProgressBarDynamic";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getImgUrlByDifficulty } from "@utils/levelImg/util";
import clsx from "clsx";
import Link from "next/link";
import { useTaskActivity } from "../hooks/useTaskActivity";

interface Props {
  slug?: string;
  item: Task;
  uid: string;
  isPro: boolean;
  freeTask: boolean;
}

const TaskCardElement: React.FC<Props> = ({
  item,
  uid,
  slug,
  isPro,
  freeTask,
}) => {
  const { earnedFP, taskStatus, selectedActivity } = useTaskActivity(
    uid,
    item.id,
    item.fitPoints ? item.fitPoints : 0,
    isPro,
    freeTask
  );

  return (
    <Link
      key={item.id}
      href={
        taskStatus === "pro"
          ? "/plans"
          : `/program/${slug}/${item.id}${
              selectedActivity?.id ? `?activityId=${selectedActivity?.id}` : ""
            }`
      }
      className={clsx(
        "flex w-full  rounded-xl md:rounded-3xl",
        taskStatus === "done" ? "bg-[#1DAC4D]" : "bg-black/30"
      )}
    >
      <div className="p-3 md:p-4 cursor-pointer flex w-full rounded-lg justify-between items-center ">
        <div className="w-2/6 relative z-0">
          {item.thumbnails ? (
            <MediaTile
              media={item.thumbnails}
              alt={item.name ? item.name : "workout task"}
              width={172}
              roundedString="rounded-lg md:rounded-xl"
              height={getHeight(item.thumbnails, 172)}
            />
          ) : null}
          {selectedActivity?.progress ? (
            <div
              className={clsx(
                "w-full flex  items-end absolute h-1/2 top-1/2 rounded-b-2xl left-0 right-0 bottom-0 pb-2 md:pb-4 px-2 md:px-4 z-50"
              )}
            >
              <div className="w-full relative z-0">
                <ProgressBarDynamic
                  backGround="#6D55D1"
                  width={selectedActivity?.progress * 100}
                  bgEmptyColor="#FFFFFF"
                  height="h-1.5"
                  pill="true"
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="pl-4 md:pl-8 w-4/6">
          <p className="text-sm md:text-2xl font-nunitoB pb-2 md:pb-6">
            {item.name}
          </p>

          {earnedFP ? (
            <div className="rounded-full border border-white w-fit px-4 h-6 md:h-8">
              <div className=" flex items-center  h-full">
                <p className="text-white truncate  text-[10px] md:text-sm font-nunitoB pr-1.5 ">
                  You earned {earnedFP}/{item.fitPoints} FP
                </p>
                <div className="h-full flex items-center ">
                  <img
                    src={arrowRightWhite}
                    className=" w-1 h-2 md:w-1.5 md:h-3 "
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1">
              <div className="flex items-center ">
                <img
                  className="w-2 h-2 md:w-3 md:h-3"
                  src={springIconWhiteFrame16}
                />
                <p className="text-gray-200 text-[10px] md:text-sm font-nunitoR pr-4 pl-1">
                  {item.fitPoints} FPs
                </p>
              </div>
              <div className="flex items-center ">
                <img
                  className="w-2 h-2 md:w-3 md:h-3"
                  src={timeIconWhiteFrame16}
                />

                <p className="text-gray-200 text-[10px] md:text-sm font-nunitoR pr-4 pl-1">
                  {item.durationMinutes} mins
                </p>
              </div>
              <div className="flex items-center ">
                <img
                  className="w-2 h-2 md:w-3 md:h-3"
                  src={
                    item.difficultyLevels
                      ? getImgUrlByDifficulty(item?.difficultyLevels)
                      : ""
                  }
                />
                <p className="text-gray-200 capitalize text-[10px] md:text-sm font-nunitoR pl-1">
                  {item.difficultyLevels}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className=" flex justify-end w-1/12  ">
          <img
            src={taskStatus === "pro" ? proIconBlack : playIconBlack}
            className="w-6  md:w-16 aspect-1/1"
          />
        </div>
      </div>
    </Link>
  );
};

export default TaskCardElement;
