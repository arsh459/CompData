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

export const useLastCreatedAppointment = (uid: string) => {
  const [appointment, setAppointment] = useState<AppointmentInterface>();
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const listener = onSnapshot(
      query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        orderBy("createdOn", "desc"),
        limit(1)
      ),
      (docs) => {
        if (docs && docs.docs.length) {
          setAppointment(docs.docs[0].data() as AppointmentInterface);
          setFetching(false);
        } else {
          setAppointment(undefined);
          setFetching(false);
        }
      }
    );

    return () => {
      listener();
    };
  }, [uid]);

  return { appointment, fetching };
};
