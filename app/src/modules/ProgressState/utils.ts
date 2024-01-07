import { SprintObject } from "@models/Event/Event";

export const getSprintIdToUse = (
  sprintId?: string,
  currentSprint?: SprintObject
) => {
  if (sprintId) {
    return sprintId;
  }

  if (currentSprint) {
    return currentSprint.id;
  }

  return "";
};
