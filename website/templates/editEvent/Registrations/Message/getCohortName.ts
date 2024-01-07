import { Cohort } from "@models/Event/Event";

export const getCohortName = (
  eventId: string,
  cohortObj: { [eventId: string]: { [cohortId: string]: Cohort } },
  cohortId?: string
) => {
  if (cohortId && cohortObj[eventId] && cohortObj[eventId][cohortId]) {
    return cohortObj[eventId][cohortId].cohortName;
  }
};
