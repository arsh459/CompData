import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
// import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
// import { useUserRank } from "@hooks/rank/useUserRank";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
// import { useUserContext } from "@providers/user/UserProvider";
import { createContext, useContext } from "react";
// import { useIsTaskAllowedV2 } from "./hooks/useIsTaskAllowedV2";
// import { useIsTaskAllowedV3 } from "./hooks/useIsTaskAllowedV3";
// import { useUserTaskProgress } from "./hooks/useUserTaskProgress";
import { PlainTaskContextInterface, PlainTaskContextProps } from "./interface";

const PlainTaskContext = createContext<PlainTaskContextInterface | undefined>(
  undefined
);

function PlainTaskProvider({
  children,
  selectedTaskId,
}: // selectedDayNumber,
// selectedDay,
// selectedDayNumber,
// selectedDayUnix,
PlainTaskContextProps) {
  // const selectedTaskId = "ab178459-c487-49e6-bbfd-98fc17f8800e";
  const { task } = useWorkoutTask(selectedTaskId);

  // const { taskProgress } = useUserTaskProgress(selectedTaskId);

  const value = {
    task,
  };

  return (
    <PlainTaskContext.Provider value={value}>
      {children}
    </PlainTaskContext.Provider>
  );
}

function usePlainTaskContext() {
  const context = useContext(PlainTaskContext);

  if (context === undefined) {
    throw new Error(
      "usePlainTaskContext must be used within PlainTaskProvider"
    );
  }

  return context;
}

export { PlainTaskProvider, usePlainTaskContext };
