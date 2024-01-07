import { taskFrequency } from "@models/Tasks/Task";
import { userTaskStatus } from "@providers/task/hooks/useIsTaskAllowedV2";
import CompletedKPI from "./StatusKPIs/CompletedKPI";
import InReviewKPI from "./StatusKPIs/InReviewKPI";
import LockedKPI from "./StatusKPIs/LockedKPI";
import ProgressKPIs from "./StatusKPIs/ProgressKPI";
import UnlockedKPIs from "./StatusKPIs/UnlockedKPI";

interface Props {
  taskLevel: number;
  taskStatus: userTaskStatus;
  unlocksNext?: number;
  userCheckedIn?: boolean;
  frequency?: taskFrequency;
  progress?: number;
  taskFitPoints: number;
  earnedFP?: number;
  unlocksAtRank?: number;
  doneBy?: string;
}

const OverlayTasks: React.FC<Props> = ({
  taskLevel,
  taskStatus,
  unlocksNext,
  userCheckedIn,
  earnedFP,
  frequency,
  progress,
  taskFitPoints,
  unlocksAtRank,
  doneBy,
}) => {
  return taskStatus === "PENDING" ? (
    <></>
  ) : taskStatus === "IN_REVIEW" ? (
    <>
      <InReviewKPI
        // progress={progress ? progress : 0}
        // earnedFP={earnedFP ? earnedFP : 0}
        overlay={true}
        doneBy={doneBy}
        // total={taskFitPoints}
      />
    </>
  ) : taskStatus === "IMPROVEMENT_TEAM_MEMBER" ? (
    <CompletedKPI
      total={taskFitPoints}
      earnedFp={earnedFP ? earnedFP : 0}
      overlay={true}
      doneBy={doneBy}
    />
  ) : taskStatus === "IMPROVEMENT" ? (
    <>
      <ProgressKPIs
        progress={progress ? progress : 0}
        earnedFP={earnedFP}
        overlay={true}
      />
    </>
  ) : taskStatus === "COMPLETED" || taskStatus === "COMPLETED_TEAM_MEMBER" ? (
    <>
      <CompletedKPI
        earnedFp={earnedFP ? earnedFP : 0}
        total={taskFitPoints}
        overlay={true}
        doneBy={doneBy}
      />
    </>
  ) : taskStatus === "FUTURE_LOCKED" ? (
    <>
      <LockedKPI unlocksNext={unlocksNext} overlay={true} />
    </>
  ) : taskStatus === "PAST_LOCKED" ? (
    <>
      <LockedKPI overlay={true} past={true} />
    </>
  ) : taskStatus === "RANK_LOCKED" ? (
    <>
      <LockedKPI overlay={true} unlocksAtRank={unlocksAtRank} />
    </>
  ) : taskStatus === "UNLOCKED" ? (
    <>
      <UnlockedKPIs overlay={true} />
    </>
  ) : null;
};

export default OverlayTasks;
