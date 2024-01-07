// import { useCoachRank } from "@hooks/activities/useCoachRank";
// import { useBadges } from "@hooks/badges/useBadges";
// import { UserRank } from "@models/Activities/Activity";
// import { GoalKPIList } from "./utils";
// import { Task, TaskProgress } from "@models/Tasks/Task";
import { useAllGoals } from "@hooks/goals/useAllGoals";
// import { useGameGoals } from "@hooks/goals/useGameGoals";
import { useUserGoalProgress } from "@hooks/goals/useUserGoalProgress";
// import { UserInterface } from "@models/User/User";
// import PrizeCard from "@templates/community/Program/Prizes/PrizesV2/PrizeCard";
import React from "react";
import GameProgramCard from "@modules/WorkoutsV3/GameProgram/GoalProgramCard";

interface Props {
  // tasks: Task[];
  uid: string;
  //   user: UserInterface;
  //   weekStartUnix?: number;
  gameId: string;
  // taskProgressObj: { [taskId: string]: TaskProgress };
}

const GoalTasks: React.FC<Props> = ({
  // tasks,
  gameId,
  uid,
  //   weekStartUnix,
  // taskProgressObj,
}) => {
  const { goals } = useAllGoals(gameId);
  const gameTasks = goals.map((item) => item.id);
  const { taskProgressObj } = useUserGoalProgress(uid, gameTasks);
  return (
    <div>
      {goals.map((item, index) => {
        return (
          <div key={`${item.id}-${index}`} className="pb-1">
            <GameProgramCard
              task={item}
              //   gameId={gameId}
              //   weekStartUnix={weekStartUnix}
              //   user={user}
              taskProgress={taskProgressObj[item.id]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GoalTasks;
