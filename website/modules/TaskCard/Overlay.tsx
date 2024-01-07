// import {
// baseImageKit,
// calendarIcon,
// lockIcon,
// } from "@constants/icons/iconURLs";
import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
import { taskFrequency } from "@models/Tasks/Task";
import { format } from "date-fns";
import CompletedKPI from "./CompletedKPI";
import DotLabel from "./DotLabel";
import LockedKPI from "./LockedKPI";
import ProgressKPIs from "./ProgressKPI";
import TaskKPIs from "./TaskKPIs";
import TopOverlay from "./TopOverlay";
import UnlockedKPIs from "./UnlockedKPI";

interface Props {
  taskLevel: number;
  // userLevel: number;
  taskStatus: userTaskStatus;
  unlocksNext?: number;
  userCheckedIn?: boolean;
  // isLocked: boolean;
  frequency?: taskFrequency;
  earnedFp?: number;
  // progress?: number;
}

const Overlay: React.FC<Props> = ({
  taskLevel,
  // userLevel,
  taskStatus,
  unlocksNext,
  userCheckedIn,
  // isLocked,
  frequency,
  earnedFp,
}) => {
  // console.log("loading", userStreams, loading);

  return taskStatus !== "PENDING" ? (
    <>
      {taskStatus === "FINALE_LOCKED" ||
      taskStatus === "LEVEL_LOCKED" ||
      taskStatus === "LEVEL_ONCE_LOCKED" ||
      taskStatus === "RANK_LOCKED" ? (
        <>
          <LockedKPI overlay={true} />
        </>
      ) : taskStatus === "PARENT_COMPLETED" || taskStatus === "COMPLETED" ? (
        // ||
        // taskStatus === "FREQUENCY_LOCKED"

        <>
          <CompletedKPI
            earnedFp={earnedFp ? earnedFp : 0}
            totalFp={earnedFp ? earnedFp : 0}
            overlay={true}
          />
        </>
      ) : taskStatus === "UNLOCKED" ? (
        <UnlockedKPIs overlay={true} />
      ) : // <TaskKPIs taskLevel={taskLevel} frequency={frequency} overlay={true} />
      userCheckedIn ? (
        <>
          <DotLabel color="bg-green-500" text="Marked Done" />
          <TaskKPIs
            taskLevel={taskLevel}
            frequency={frequency}
            overlay={true}
          />
        </>
      ) : taskStatus === "IMPROVEMENT" ? (
        <>
          {/* <DotLabel color="bg-yellow-500" text="Can Improve" />
          <TaskKPIs
            taskLevel={taskLevel}
            frequency={frequency}
            overlay={true}
          /> */}
          <ProgressKPIs progress={50} overlay={true} />
        </>
      ) : null}

      {taskStatus === "FINALE_LOCKED" ? (
        <>
          <TopOverlay textWhite="Unlocks in" textPrimary="Finale" />
        </>
      ) : taskStatus === "FREQUENCY_LOCKED" ? (
        <>
          <TopOverlay
            textWhite="Unlocks"
            textPrimary={
              unlocksNext ? format(new Date(unlocksNext), "d MMM") : ""
            }
          />
          <TaskKPIs
            taskLevel={taskLevel}
            frequency={frequency}
            overlay={true}
          />
        </>
      ) : taskStatus === "LEVEL_LOCKED" ? (
        <>
          <TopOverlay textWhite="Unlocks at" textPrimary={`Lvl ${taskLevel}`} />
        </>
      ) : taskStatus === "LEVEL_ONCE_LOCKED" ? (
        <TopOverlay textWhite="Only for" textPrimary={`Lvl ${taskLevel}`} />
      ) : taskStatus === "PARENT_COMPLETED" ? (
        <></>
      ) : taskStatus === "RANK_LOCKED" ? (
        <TopOverlay textWhite="Only for" textPrimary={`top 50`} />
      ) : null}
    </>
  ) : (
    <>
      <div className="w-full flex justify-center items-end absolute h-full top-0 rounded-2xl left-0 right-0 bottom-0 bg-gradient-to-b to-smoke-750 from-transparent z-50"></div>
    </>
  );
};

export default Overlay;
