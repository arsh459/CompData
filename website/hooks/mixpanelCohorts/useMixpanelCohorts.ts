import { db } from "@config/firebase";
import { MixPanelCohort } from "@models/mixpanel/mixpanelCohort";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useMixpanelCohorts = () => {
  const [cohorts, setCohorts] = useState<MixPanelCohort[]>([]);
  useEffect(() => {
    const getCohorts = async () => {
      const docs = await getDocs(collection(db, "mixpanelCohorts"));
      const remoteCohorts: MixPanelCohort[] = [];
      for (const doc of docs.docs) {
        remoteCohorts.push(doc.data() as MixPanelCohort);
      }

      setCohorts(remoteCohorts);
    };

    getCohorts();
  }),
    [];

  return {
    cohorts,
  };
};
