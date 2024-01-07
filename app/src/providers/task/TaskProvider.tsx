import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { createContext, useContext } from "react";
import { useIsTaskAllowedV4 } from "./hooks/useIsTaskAllowedV4";
// import { useUserTaskProgress } from "./hooks/useUserTaskProgress";
import { TaskContextInterface, TaskContextProps } from "./interface";

const TaskContext = createContext<TaskContextInterface | undefined>(undefined);

function TaskProvider({
  children,
  selectedTaskId,
  selectedUnix,
}: // selectedDayNumber,
// selectedDay,
// selectedDayNumber,
// selectedDayUnix,
TaskContextProps) {
  // const selectedTaskId = "ab178459-c487-49e6-bbfd-98fc17f8800e";
  const { task, loading } = useWorkoutTask(selectedTaskId);

  // const { taskProgress } = useUserTaskProgress(selectedTaskId);

  const {
    taskStatus,
    progress,
    earnedFP,
    // numAttempts,
    unlocksIn,
    selectedActivity,
  } = useIsTaskAllowedV4(
    selectedUnix,
    task?.taskType === "nutrition" ? 0.1 : 0.95,
    // taskProgress,
    task
  );

  const value = {
    task,
    loading,
    taskStatus,
    progress,
    unlocksIn,
    earnedFP,
    selectedActivity,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

function useTaskContext() {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
}

export { TaskProvider, useTaskContext };
