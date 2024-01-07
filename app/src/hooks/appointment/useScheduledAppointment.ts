import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useAppointmentCheck = () => {
  const { state } = useAuthContext();

  const [appointment, setAppointment] = useState<AppointmentInterface>();
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const listener = firestore()
      .collection("appointments")
      .where("patientId", "==", state.uid)
      .orderBy("startSlot", "desc")
      .limit(1)
      .onSnapshot((docs) => {
        if (docs && docs?.docs && docs?.docs?.length) {
          setAppointment(docs.docs[0].data() as AppointmentInterface);
          setFetching(false);
        } else {
          setAppointment(undefined);
          setFetching(false);
        }
      });

    return () => {
      listener();
    };
  }, [state.uid]);

  return { appointment, fetching };
};
