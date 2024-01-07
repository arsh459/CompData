import { db } from "@config/firebase";
import { AppointmentInterface } from "@models/Appintment";
import {
  Query,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useAppointmentAttempts = (
  doctorId: string,
  fetchAll?: boolean
) => {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [selected, setSelected] = useState<AppointmentInterface>();
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchAppointments = async (uid: string) => {
      setFetching(true);

      let que: Query;
      if (fetchAll) {
        que = query(
          collection(db, "appointments"),
          orderBy("createdOn", "desc")
        );
      } else {
        que = query(
          collection(db, "appointments"),
          where("doctorId", "==", uid),
          orderBy("createdOn", "desc")
        );
      }

      const remoteDocs = await getDocs(que);
      const remoteAppointments = [] as AppointmentInterface[];

      for (const doc of remoteDocs.docs) {
        const appDoc = doc.data() as AppointmentInterface;
        if (
          appDoc.startSlot &&
          appDoc.category !== "gynaecologist" &&
          appDoc.category !== "health_coach" &&
          appDoc.category !== "nutrtitionist"
        ) {
        } else {
          const patientID = appDoc.patientId;
          const docs = await getDocs(
            query(
              collection(db, "appointments"),
              where("patientId", "==", patientID),
              orderBy("startSlot", "desc"),
              limit(1)
            )
          );

          if (docs.docs.length === 0) {
            remoteAppointments.push(appDoc);
          }
        }
      }

      setAppointments(remoteAppointments);

      setFetching(false);
    };

    doctorId && fetchAppointments(doctorId);
  }, [doctorId, fetchAll]);

  return {
    appointments,
    selected,
    setSelected,
    fetching,
    setAppointments,
  };
};
