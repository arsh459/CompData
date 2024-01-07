import { db } from "@config/firebase";
import { CalendlySession } from "@models/CalendlySession";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCalendlySession = (id?: string) => {
  const [calendlySession, setCalendlySession] = useState<CalendlySession>();

  useEffect(() => {
    if (id) {
      const listener = onSnapshot(doc(db, "calendly", id), (remDoc) => {
        if (remDoc.data()) {
          setCalendlySession(remDoc.data() as CalendlySession);
        }
      });

      return () => {
        listener();
      };
    }
  }, [id]);

  return {
    calendlySession,
  };
};
