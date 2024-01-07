import { db } from "@config/firebase";
import { AppointmentInterface } from "@models/Appintment";
import {
  Query,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
export type agentsUidType =
  | "fC1idaBK2zbWdKhE5GFCfsoYTrJ3"
  | "A0PdJiCDDpdd1PCrkhjQ3WjQEuk2"
  | "s8yb7RmadXQT4vJIsST0Jio1XQD3"
  | "PkAUaJD109N9xFRJoKU4oaVJS223"
  | "Th68Mg4rbDXFJEr0SUnQPVZl9oJ3"
  | "96Xj1xjNTLVZy6TQ8Ett48WCXNt2";

export const useAppointments = (doctorId: string, fetchAll?: boolean) => {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [selected, setSelected] = useState<AppointmentInterface>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [agentType, setAgentType] = useState<agentsUidType | "all">("all");

  useEffect(() => {
    const fetchAppointments = async (uid: string) => {
      setFetching(true);

      let que: Query = query(collection(db, "appointments"));

      if (!fetchAll && uid) {
        que = query(
          collection(db, "appointments"),
          where("doctorId", "==", uid),
          orderBy("startSlot", "desc")
        );
      } else if (fetchAll && agentType === "all") {
        que = query(
          collection(db, "appointments"),
          orderBy("startSlot", "desc")
        );
      } else if (fetchAll && agentType) {
        que = query(
          collection(db, "appointments"),
          where("doctorId", "==", agentType),
          orderBy("startSlot", "desc")
        );
      }

      // else if (agentType){
      //   que = query(
      //     collection(db, "appointments"),
      //     where("doctorId", "==", agentType),
      //     orderBy("startSlot", "desc")
      //   );
      // }

      // if (agentType === "all") {
      //   if (fetchAll) {
      //     que = query(
      //       collection(db, "appointments"),
      //       orderBy("startSlot", "desc")
      //     );
      //   } else {
      //     que = query(
      //       collection(db, "appointments"),
      //       where("doctorId", "==", uid),
      //       orderBy("startSlot", "desc")
      //     );
      //   }
      // }

      // if (agentType && agentType !== "all") {
      //   que = query(
      //     collection(db, "appointments"),
      //     where("doctorId", "==", agentType),
      //     orderBy("startSlot", "desc")
      //   );
      // }

      const remoteDocs = await getDocs(que);

      const remoteAppointments = [] as AppointmentInterface[];

      for (const doc of remoteDocs.docs) {
        remoteAppointments.push(doc.data() as AppointmentInterface);
      }

      setAppointments(remoteAppointments);

      setFetching(false);
    };

    doctorId && fetchAppointments(doctorId);
  }, [doctorId, fetchAll, agentType]);

  return {
    appointments,
    selected,
    setSelected,
    fetching,
    setAppointments,
    setAgentType,
    agentType,
  };
};
