import { LocalCohort } from "@models/Event/Event";
import { useEffect, useState } from "react";

export const useCohort = (cohorts: LocalCohort[]) => {
  const [selectedCohort, setSelectedCohort] = useState<
    LocalCohort | undefined
  >();

  useEffect(() => {
    if (cohorts.length > 0) {
      for (const cohort of cohorts) {
        if (cohort.pinned) {
          setSelectedCohort(cohort);
          break;
        }
      }
    } else {
      setSelectedCohort(undefined);
    }
  }, [cohorts]);
  return {
    selectedCohort,
    setSelectedCohort,
  };
};
