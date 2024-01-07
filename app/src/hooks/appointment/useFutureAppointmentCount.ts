import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useFutureAppointmentCount = () => {
  const { state } = useAuthContext();

  const [numberOfFutureScheduledAppointments, setFutureCount] =
    useState<number>(0);

  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    firestore()
      .collection("appointments")
      .where("patientId", "==", state.uid)
      .where("startSlot", ">=", Date.now())
      .where("status", "==", "SCHEDULED")
      .count()
      .get()
      .then((count) => {
        const numberOfFutureDocs = count.data.length;
        setFutureCount(numberOfFutureDocs);
        setFetching(false);
      });
  }, [state.uid]);

  return { numberOfFutureScheduledAppointments, fetching };
};
