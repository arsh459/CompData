import { Cohort, LocalCohort } from "@models/Event/Event";
import { parseCohort } from "@models/Event/parse";
import { useEffect, useState } from "react";

export const useLocalCohorts = (cohorts: Cohort[]) => {
  const [parsedCohorts, setParsed] = useState<LocalCohort[]>([]);
  const [totalSold, setTotalSold] = useState<number>(0);
  const [totalLeft, setTotalLeft] = useState<number>(0);

  useEffect(() => {
    if (cohorts) {
      const parsedCohorts: LocalCohort[] = [];
      let sold = 0;
      let left = 0;
      for (const cohort of cohorts) {
        const parsedCohort = parseCohort(cohort);
        sold += cohort.seatsBooked;
        left += cohort.cohortSize - cohort.seatsBooked;

        parsedCohorts.push(parsedCohort);
      }

      const sortedCohorts = parsedCohorts.sort((a, b) => {
        if (a.registerBy && b.registerBy) {
          return a.registerBy.getTime() - b.registerBy.getTime();
        } else {
          return 0;
        }
      });

      setTotalSold(sold);
      setTotalLeft(left);

      setParsed(sortedCohorts);
    }
  }, [cohorts]);

  return {
    parsedCohorts,
    totalSold,
    totalLeft,
  };
};
