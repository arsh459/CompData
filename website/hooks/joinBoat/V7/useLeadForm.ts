import { db } from "@config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

export const useLeadForm = (uid?: string) => {
  useEffect(() => {
    if (uid) {
      updateDoc(doc(db, "users", uid), {
        ["leadFormFlags.seen"]: true,
      });
    }
  }, [uid]);
};
