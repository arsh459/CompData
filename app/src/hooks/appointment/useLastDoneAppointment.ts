import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";

export const useLastDoneAppointment = () => {
  const { state } = useAuthContext();
  const [lastDoneApp, setLastDoneApp] = useState<AppointmentInterface>();
  useEffect(() => {
    const listener = firestore()
      .collection("appointments")
      .where("patientId", "==", state.uid)
      .where("status", "==", "DONE")
      .orderBy("startSlot", "desc")
      .limit(1)
      .onSnapshot((docs) => {
        if (docs && docs.docs.length) {
          const appointment = docs.docs[0].data() as AppointmentInterface;
          setLastDoneApp(appointment);
        }
      });

    return () => {
      listener();
    };
  }, [state.uid]);

  return {
    appointment: lastDoneApp,
  };
};
