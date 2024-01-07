import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useDoneAppointmentsCountFromUnix = (lastPaidUnix?: number) => {
  const { state } = useAuthContext();

  const [appointmentsCount, setAppointmentsCount] = useState<number>(-1);

  useEffect(() => {
    const getCount = async () => {
      const docRef = firestore()
        .collection("appointments")
        .where("patientId", "==", state.uid)
        .where("status", "==", "DONE");

      const q = lastPaidUnix
        ? docRef.where("startSlot", ">=", lastPaidUnix)
        : docRef;

      const snapshot = await q.count().get();

      setAppointmentsCount(snapshot.data().count);
    };

    getCount();
  }, [state.uid]);

  return { appointmentsCount };
};
