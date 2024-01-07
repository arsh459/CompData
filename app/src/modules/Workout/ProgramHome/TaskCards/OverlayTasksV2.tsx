// import { taskFrequency } from "@models/Tasks/Task";
// import { userTaskStatus } from "@providers/task/hooks/useIsTaskAllowedV2";
// import Loading from "@components/loading/Loading";
import { TaskStatusV2 } from "@providers/task/hooks/useIsTaskAllowedV3";
// import { View } from "react-native";
import CompletedKPI from "./StatusKPIs/CompletedKPI";
import InReviewKPI from "./StatusKPIs/InReviewKPI";
import LockedKPI from "./StatusKPIs/LockedKPI";
import Pending from "./StatusKPIs/Pending";
// import LockedKPI from "./StatusKPIs/LockedKPI";
import ProgressKPIs from "./StatusKPIs/ProgressKPI";
import UnlockedKPIs from "./StatusKPIs/UnlockedKPI";
import UnlockedPro from "./StatusKPIs/UnlockedPro";

interface Props {
  taskLevel: number;
  taskStatus: TaskStatusV2;
  numAttempts: number;
  //   userCheckedIn?: boolean;
  //   frequency?: taskFrequency;
  progress?: number;
  taskFitPoints: number;
  earnedFP?: number;
  //   unlocksAtRank?: number;
  doneBy?: string;
}

const OverlayTasksV2: React.FC<Props> = ({
  taskLevel,
  taskStatus,
  //   unlocksNext,
  //   userCheckedIn,
  earnedFP,
  //   frequency,
  progress,
  taskFitPoints,
  //   unlocksAtRank,
  doneBy,
}) => {
  return taskStatus === "UNLOCKED" ? (
    <UnlockedKPIs overlay={true} />
  ) : taskStatus === "PRO" ? (
    <UnlockedPro overlay={true} />
  ) : taskStatus === "PENDING" ? (
    <Pending overlay={true} />
  ) : taskStatus === "IN_REVIEW" ? (
    <InReviewKPI
      // progress={progress ? progress : 0}
      // earnedFP={earnedFP ? earnedFP : 0}
      overlay={true}
      doneBy={doneBy}
      // total={taskFitPoints}
    />
  ) : taskStatus === "IMPROVEMENT" ? (
    <>
      <ProgressKPIs
        progress={progress ? progress : 0}
        earnedFP={earnedFP}
        overlay={true}
      />
    </>
  ) : taskStatus === "COMPLETED" ? (
    <>
      <CompletedKPI
        earnedFp={earnedFP ? earnedFP : 0}
        total={taskFitPoints}
        overlay={true}
        doneBy={doneBy}
      />
    </>
  ) : taskStatus === "COMPLETED_BEFORE" ? (
    <>
      <UnlockedKPIs overlay={true} cta="Replay Task" />
    </>
  ) : taskStatus === "LOCKED" ? (
    <>
      <LockedKPI
        overlay={true}
        unlockText={`Finish at least one task of day ${
          taskLevel > 0 ? taskLevel - 1 : 0
        }`}
      />
    </>
  ) : null;
};

export default OverlayTasksV2;
