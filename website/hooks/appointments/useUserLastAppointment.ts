import { db } from "@config/firebase";
import { AppointmentInterface } from "@models/Appintment";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserLastAppointment = (uid?: string) => {
  const [appointment, setAppointment] = useState<AppointmentInterface>();

  useEffect(() => {
    if (uid) {
      const q = query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        orderBy("startSlot", "desc"),
        limit(1)
      );

      const unsub = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length && snapshot.docs[0].data()) {
          setAppointment(snapshot.docs[0].data() as AppointmentInterface);
        }
      });

      return () => unsub();
    }
  }, [uid]);

  return {
    appointment,
  };
};
