// import { useUserWorkoutTasksByLevel } from "@hooks/tasks/useUserWorkoutTasksByLevel";
import { SelectedType } from "@hooks/tasks/program/useProgramTasks";
import { gameTypes } from "@models/Event/Event";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
// import TaskCardV2 from "@modules/TaskCard/TaskCardV2";
import TaskCardV3 from "@modules/TaskCard/TaskCardV3";
// import TaskCardV2 from "@modules/TaskCard/TaskCardV2";
// import TaskCardV3 from "@modules/TaskCard/TaskCardV3";
// import { getLevelColorV3 } from "@templates/LandingPage/levelColor";
import React from "react";
import FinaleContainer from "../FinaleContainer/FinaleContainer";
import GrandFinale from "../FinaleContainer/GrandFinale";
import TrialPeriod from "./TrialPeriod";
// import GrandFinaleCard from "../GrandFinaleCard";
// import GoalProgramCard from "./GoalProgramCard";
// import RoundedCircleButton from "../RoundedCircleButton";

interface Props {
  //   userLevel?: number;
  //   gameId?: string;

  isFinaleDay?: boolean;
  onTaskClick: (id: string) => void;
  tasks: Task[];
  user: UserInterface;
  weekStartUnix?: number;
  weekEndUnix?: number;
  userRank: number;
  gameId: string;
  isFinaleActive?: boolean;
  dayStartProgram?: number;
  currentDayNumber?: number;
  browseBy?: SelectedType;
  gameType?: gameTypes;
  teamId?: string;
  gameStarts?: number;
}

const TaskCards: React.FC<Props> = ({
  tasks,
  user,
  onTaskClick,
  weekEndUnix,
  gameStarts,
  weekStartUnix,
  userRank,
  gameId,
  isFinaleActive,
  dayStartProgram,
  isFinaleDay,
  currentDayNumber,
  browseBy,
  gameType,
  teamId,
}) => {
  //   const [selectedLevel, setLevel] = useState<number>(userLevel ? userLevel : 1);
  //   const { tasks } = useUserWorkoutTasksByLevel(selectedLevel, gameId);
  // console.log("dayStartProgram", dayStartProgram);

  return (
    <>
      {false ? (
        <>
          {tasks &&
            tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className="px-4 mt-2"
                  onClick={() => onTaskClick(task.id)}
                >
                  <FinaleContainer>
                    <GrandFinale
                      uid={user.uid}
                      roundStartUnix={weekStartUnix}
                      userRank={1}
                      dayStartProgram={dayStartProgram}
                      isFinaleActive={isFinaleActive}
                      userLevel={user.userLevelV2 ? user.userLevelV2 : 0}
                      isAdmin={user.role === "admin"}
                      task={task}
                      gameId={gameId}
                    />
                  </FinaleContainer>
                </div>
              );
            })}
        </>
      ) : (
        <>
          <TrialPeriod gameStarts={gameStarts} />
          <div className="grid pt-6 grid-cols-2 gap-8 px-4">
            {tasks &&
              tasks.map((task) => {
                return (
                  <div key={task.id} className="py-2">
                    <TaskCardV3
                      uid={user.uid}
                      userRank={1}
                      gameStarts={gameStarts}
                      currentDayNumber={currentDayNumber}
                      dayStartProgram={dayStartProgram}
                      roundStartUnix={weekStartUnix}
                      roundEndUnix={weekEndUnix}
                      isFinaleActive={isFinaleActive}
                      userLevel={user.userLevelV2 ? user.userLevelV2 : 0}
                      isAdmin={user.role === "admin"}
                      task={task}
                      onWorkoutClick={() => onTaskClick(task.id)}
                      gameId={gameId}
                      browseBy={browseBy}
                      gameType={gameType}
                      teamId={teamId}
                    />
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default TaskCards;
