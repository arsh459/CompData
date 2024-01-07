import { useIsTaskAllowedV2 } from "@hooks/tasks/access/useIsTaskAllowedV2";
import { Task } from "@models/Tasks/Task";
import React from "react";
import FinaleButton from "./FinaleButton";
import FinaleDetails from "./FinaleDetails";
import FinaleMedia from "./FinaleMedia";
import FinaleOverlay from "./FinaleOverlay";
interface Props {
  uid: string;
  userRank: number;
  dayStartProgram: number | undefined;
  roundStartUnix: number | undefined;
  userLevel: number;
  task: Task;
  gameId: string;
  isAdmin?: boolean;
  isFinaleActive?: boolean;
}
const GrandFinale: React.FC<Props> = ({
  dayStartProgram,
  gameId,
  task,
  uid,
  userLevel,
  userRank,
  isAdmin,
  isFinaleActive,
  roundStartUnix,
}) => {
  const { taskStatus, unlocksNext } = useIsTaskAllowedV2(
    userLevel,
    task,
    dayStartProgram,
    roundStartUnix,
    userRank,
    uid,
    gameId,
    false,
    isFinaleActive
  );
  return (
    <>
      {task ? (
        <>
          <div className="relative">
            <FinaleMedia task={task} />

            <FinaleOverlay
              taskFp={task.fitPoints}
              taskName={task.name}
              topText={"Live"}
              isLocked={taskStatus === "FINALE_LOCKED"}
              unlocksNext={unlocksNext}
            />
          </div>
          <div className="flex justify-between pt-2">
            <FinaleDetails textSecondary={task.name} />
            <FinaleButton isLocked={taskStatus === "FINALE_LOCKED"} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default GrandFinale;
