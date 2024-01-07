import { Task } from "./Task";

export const isTaskAvailable = (
  task: Task,
  level: number,
  userRank: number,
  isAdmin?: boolean
) => {
  if (isAdmin) {
    return true;
  }

  // task is rank available only
  if (isRankLocked(task.unlocksAtRank, userRank)) {
    return false;
  }

  const taskLevel = task.level ? task.level : 0;
  if (task.onLevelOnly && taskLevel === level) {
    return true;
  } else if (!task.onLevelOnly && level >= taskLevel) {
    return true;
  }

  return false;
};

export const isRankLocked = (unlocksAtRank?: number, userRankI?: number) => {
  const taskRank = unlocksAtRank ? unlocksAtRank : -1;
  const userRank = userRankI ? userRankI : -1;
  if (taskRank > 0 && userRank > taskRank) {
    return true;
  }

  return false;
};

export const isLevelLocked = (
  userLevelI?: number,
  taskLevelI?: number,
  onLevelOnly?: boolean
) => {
  const taskLevel = taskLevelI ? taskLevelI : 0;
  const userLevel = userLevelI ? userLevelI : 0;
  if (!onLevelOnly && taskLevel > userLevel) {
    return true;
  }

  return false;
};

export const isLevelOnlyLocked = (
  userLevelI?: number,
  taskLevelI?: number,
  onLevelOnly?: boolean
) => {
  const taskLevel = taskLevelI ? taskLevelI : 0;
  const userLevel = userLevelI ? userLevelI : 0;

  if (
    typeof onLevelOnly === "boolean" &&
    onLevelOnly &&
    taskLevel !== userLevel
  ) {
    return true;
  }

  return false;
};

export const isFinaleLocked = (
  isFinaleTask?: boolean,
  isFinaleActive?: boolean
) => {
  if (isFinaleTask && !isFinaleActive) {
    return true;
  }

  return false;
};
