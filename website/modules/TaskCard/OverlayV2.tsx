// import {
// baseImageKit,
// calendarIcon,
// lockIcon,
// } from "@constants/icons/iconURLs";
import { userTaskStatus } from "@hooks/tasks/access/useIsTaskAllowed";
import { taskFrequency } from "@models/Tasks/Task";
// import { format } from "date-fns";
import CompletedKPI from "./CompletedKPI";
import InReviewKPI from "./InReviewKPI";
// import DotLabel from "./DotLabel";
import LockedKPI from "./LockedKPI";
import ProgressKPIs from "./ProgressKPI";
// import TaskKPIs from "./TaskKPIs";
// import TopOverlay from "./TopOverlay";
import UnlockedKPIs from "./UnlockedKPI";

interface Props {
  taskLevel: number;
  // userLevel: number;
  taskStatus: userTaskStatus;
  unlocksNext?: number;
  userCheckedIn?: boolean;
  // isLocked: boolean;
  frequency?: taskFrequency;
  progress?: number;
  taskFitPoints: number;
  earnedFP?: number;
  unlocksAtRank?: number;
  doneBy?: string;
  // isDoneBySomeoneElse?: boolean;
  // progress?: number;
}

const OverlayV2: React.FC<Props> = ({
  taskLevel,
  // userLevel,
  taskStatus,
  unlocksNext,
  userCheckedIn,
  earnedFP,
  frequency,
  progress,
  taskFitPoints,
  unlocksAtRank,
  doneBy,
  // isDoneBySomeoneElse,
}) => {
  // console.log("frequency", frequency);

  return taskStatus === "PENDING" ? (
    <></>
  ) : taskStatus === "IN_REVIEW" ? (
    <>
      <InReviewKPI
        // earnedFp={earnedFP ? earnedFP : 0}
        totalFp={taskFitPoints}
        overlay={true}
        doneBy={doneBy}
        // isNotComplete={true}
      />
    </>
  ) : taskStatus === "IMPROVEMENT_TEAM_MEMBER" ? (
    <>
      <CompletedKPI
        earnedFp={earnedFP ? earnedFP : 0}
        totalFp={taskFitPoints}
        overlay={true}
        doneBy={doneBy}
        isNotComplete={true}
      />
    </>
  ) : taskStatus === "IMPROVEMENT" ? (
    <>
      <ProgressKPIs
        progress={progress ? progress : 0}
        earnedFP={earnedFP}
        overlay={true}
        frequency={frequency}
      />
    </>
  ) : taskStatus === "COMPLETED" ? (
    <>
      <CompletedKPI
        totalFp={taskFitPoints}
        earnedFp={taskFitPoints}
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
      <LockedKPI
        overlay={true}
        past={true}
        totalFp={taskFitPoints}
        earnedFp={earnedFP}
      />
    </>
  ) : taskStatus === "RANK_LOCKED" ? (
    <>
      <LockedKPI overlay={true} unlocksAtRank={unlocksAtRank} />
    </>
  ) : taskStatus === "UNLOCKED" ? (
    <>
      <UnlockedKPIs overlay={true} frequency={frequency} />
    </>
  ) : null;
};

export default OverlayV2;
