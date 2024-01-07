// import { dateObject } from "@hooks/program/useProgramTasks";
import { Activity } from "@models/Activity/Activity";
import { Task } from "@models/Tasks/Task";
import { statusTypes } from "@modules/HomeScreen/MyPlan/utils";
// import { userTaskStatus } from "./hooks/useIsTaskAllowedV2";
// import { TaskStatusV2 } from "./hooks/useIsTaskAllowedV3";

export type TaskContextProps = {
  children: React.ReactNode;
  selectedTaskId: string;
  // selectedDayNumber: number;
  selectedUnix: number;
};

export type PlainTaskContextProps = {
  children: React.ReactNode;
  selectedTaskId: string;
  // selectedDayNumber: number;
};

export interface PlainTaskContextInterface {
  task?: Task;
}

export interface TaskContextInterface {
  task?: Task;
  loading?: boolean;
  taskStatus?: statusTypes;
  progress: number;
  unlocksIn: string;
  earnedFP: number;
  selectedActivity?: Activity;
  // userCheckedIn: boolean;
  // actAuthorUID?: string;
  // selectedDayNumber: number;
  // selectedDayUnix: number;
}
