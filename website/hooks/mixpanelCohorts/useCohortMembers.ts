import { db } from "@config/firebase";
import { MixpanelMemberFirstore } from "@models/mixpanel/mixpanelCohort";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCohortMembers = (cohortId: string) => {
  const [members, setMembers] = useState<MixpanelMemberFirstore[]>([]);
  useEffect(() => {
    const getMembers = async () => {
      const docs = await getDocs(
        collection(doc(db, "mixpanelCohorts", cohortId), "members")
      );
      const remoteMembers: MixpanelMemberFirstore[] = [];
      for (const doc of docs.docs) {
        remoteMembers.push(doc.data() as MixpanelMemberFirstore);
      }

      setMembers(remoteMembers);
    };

    cohortId && getMembers();
  }),
    [];

  return {
    members,
  };
};
