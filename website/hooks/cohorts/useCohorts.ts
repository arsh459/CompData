import { useEffect, useState } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "@config/firebase";
import { Cohort, LocalCohort } from "@models/Event/Event";
import { dashboardQuery } from "@hooks/drawer/interface";
import { useRouter } from "next/router";
// import { getCohortDrawer } from "./utils";
import { parseCohort } from "@models/Event/parse";
// import { DrawerElement } from "@components/drawers/Drawer";

export const useCohorts = () => {
  const [cohorts, setCohorts] = useState<LocalCohort[]>([]);
  const [selectedCohort, setSelectedCohort] = useState<LocalCohort>();

  const router = useRouter();
  const q = router.query as dashboardQuery;

  useEffect(() => {
    if (router.isReady && q.eventId) {
      const cohortRef = collection(
        doc(collection(db, "sbEvents"), q.eventId),
        "cohorts"
      );

      const unsub = onSnapshot(cohortRef, (querySnapshot) => {
        const remCohorts: LocalCohort[] = [];
        querySnapshot.forEach((doc) => {
          const rmTmp = doc.data() as Cohort;
          const parsedCohort = parseCohort(rmTmp);

          // pinned cohort
          if (parsedCohort.pinned) {
            setSelectedCohort(parsedCohort);
          }

          remCohorts.push(parsedCohort);
        });

        setCohorts(remCohorts);
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [router.isReady, q.eventId]);

  return {
    cohorts,
    setCohorts,
    selectedCohort,
    setSelectedCohort,
  };
};
