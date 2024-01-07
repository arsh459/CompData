import { Cohort } from "@models/Event/Event";
import { getRemoteCohort } from "@models/Event/getUtils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface checkoutQuery {
  cohortId?: string;
}

export const useRemoteCohort = (eventId?: string) => {
  const [cohort, setCohort] = useState<Cohort>();

  const router = useRouter();
  const q = router.query as checkoutQuery;

  useEffect(() => {
    const getCohort = async () => {
      if (router.isReady && eventId && q.cohortId) {
        const remoteCohort = await getRemoteCohort(eventId, q.cohortId);
        if (remoteCohort) {
          setCohort(remoteCohort);
        }
      }
    };

    getCohort();
  }, [eventId, q.cohortId, router.isReady]);

  return {
    cohort,
  };
};
