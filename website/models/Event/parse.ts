import { Cohort, LocalCohort } from "./Event";

export const parseCohort = (cohort: Cohort): LocalCohort => {
  return {
    ...cohort,
    registerBy: new Date(cohort.registerBy),
    ...(typeof cohort.cohortStarts === "string" && cohort.cohortStarts
      ? { cohortStarts: new Date(cohort.cohortStarts) }
      : { cohortStarts: undefined }),

    // ...(cohort.cohortStarts
    //   ? { cohortStarts: new Date(cohort.cohortStarts) }
    //   : {}),
    // sessions: cohort.sessions
    //   ? cohort.sessions.map((sess) => {
    //       return { ...sess, startTime: new Date(sess.startTime) };
    //     })
    //   : [],
  };
};

export const parseCohorts = (cohorts: Cohort[]): LocalCohort[] => {
  return cohorts.map((item) => parseCohort(item));
};
