import { baseImageKit, lockedIconNoKeyHole } from "@constants/icons/iconURLs";
import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
import { format } from "date-fns";
import React from "react";
import ProgressBarDynamic from "./ProgressBarDynamic";

interface Props {
  canPost: boolean;
  possiblePts: number;
  progress: number;
  unlocksNext?: number;
  taskStatus?: userTaskStatus;
}

const TaskProgress: React.FC<Props> = ({
  unlocksNext,
  progress,
  possiblePts,
  canPost,

  taskStatus,
}) => {
  const prog = Math.round(progress * 100);

  return (
    <>
      <div className="bg-gradient-to-t from-[#9FC6FF] to-[#B3A0FF] p-4 rounded-2xl">
        {taskStatus === "PENDING" ? (
          <></>
        ) : taskStatus === "IMPROVEMENT" || taskStatus === "UNLOCKED" ? (
          <>
            <div className="flex justify-between py-3 text-xl font-[500] text-white">
              <p>You can earn {possiblePts} FPs more</p>
              <span>{prog}%</span>
            </div>
            <div className="py-3">
              <ProgressBarDynamic
                bgEmptyColor="#777777"
                backGround="#FFFFFF"
                width={prog}
              />
            </div>
          </>
        ) : taskStatus === "IN_REVIEW" ? (
          <>
            <div className="bg-white p-2.5 rounded-xl">
              <div className="flex items-center">
                <img
                  src={`${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`}
                />
                <h5 className="text-yellow-700 font-extrabold text-lg pl-2.5">
                  Task is in review
                </h5>
              </div>
              <p className="text-[#335E7D] py-3">
                Task review can take upto 15-20 minutes depending on time of
                day.
              </p>
            </div>
          </>
        ) : taskStatus === "IMPROVEMENT_TEAM_MEMBER" ? (
          <>
            <div className="flex justify-between py-3 text-xl font-[500] text-white">
              <p>Someone else from your team is doing this</p>
              <span>{prog}%</span>
            </div>
            <div className="py-3">
              <ProgressBarDynamic
                bgEmptyColor="#777777"
                backGround="#FFFFFF"
                width={prog}
              />
            </div>
          </>
        ) : taskStatus === "COMPLETED" ? (
          <div className="bg-white p-2.5 rounded-xl">
            <div className="flex items-center">
              <img
                src={`https://ik.imagekit.io/socialboat/Group_129_vq_xrO-sj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652689883205`}
                alt="done icon"
              />
              <h5 className="text-[#00AC45] font-extrabold text-lg pl-2.5">
                Task Completed
              </h5>
            </div>
            <p className="text-[#335E7D] py-3">
              You have completed this task! Choose the below tasks to Grow more
              .
            </p>
          </div>
        ) : taskStatus === "FUTURE_LOCKED" ? (
          <div className="bg-white p-2.5 rounded-xl">
            <div className="flex items-center">
              <img
                src={`${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`}
              />
              <h5 className="text-red-500 font-extrabold text-lg pl-2.5">
                Task Locked
              </h5>
            </div>
            <p className="text-[#335E7D] py-3">
              {unlocksNext
                ? `This task will unlock on ${format(
                    new Date(unlocksNext),
                    "d MMM"
                  )}`
                : "Task will unlock soon in future"}
            </p>
          </div>
        ) : taskStatus === "PAST_LOCKED" ? (
          <div className="bg-white p-2.5 rounded-xl">
            <div className="flex items-center">
              <img
                src={`${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`}
              />
              <h5 className="text-red-500 font-extrabold text-lg pl-2.5">
                Task Locked
              </h5>
            </div>
            <p className="text-[#335E7D] py-3">
              Time to do this task has passed. Explore other tasks now.
            </p>
          </div>
        ) : taskStatus === "RANK_LOCKED" ? (
          <div className="bg-white p-2.5 rounded-xl">
            <div className="flex items-center">
              <img
                src={`${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`}
              />
              <h5 className="text-red-500 font-extrabold text-lg pl-2.5">
                Task Locked
              </h5>
            </div>
            <p className="text-[#335E7D] py-3">
              This task is accessible to top leaderboard ranks.
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TaskProgress;
