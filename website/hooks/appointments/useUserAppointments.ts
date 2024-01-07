import { db } from "@config/firebase";
import { AppointmentInterface } from "@models/Appintment";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserAppointments = (patientId?: string) => {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [selected, setSelected] = useState<AppointmentInterface>();
  useEffect(() => {
    const fetchAppointments = async (patientId: string) => {
      const que = query(
        collection(db, "appointments"),
        where("patientId", "==", patientId),
        orderBy("startSlot", "desc")
      );
      const remoteDocs = await getDocs(que);

      const remoteAppointments = [] as AppointmentInterface[];
      for (const doc of remoteDocs.docs) {
        remoteAppointments.push(doc.data() as AppointmentInterface);
      }
      setAppointments(remoteAppointments);
      if (remoteAppointments.length) {
        setSelected(remoteAppointments[0]);
      }
    };
    patientId && fetchAppointments(patientId);
  }, [patientId]);
  return {
    appointments,
    selected,
    setSelected,
  };
};
