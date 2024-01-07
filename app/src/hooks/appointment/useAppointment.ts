import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";

export const useAppointment = (appointmentId?: string) => {
  const [appointment, setAppointment] = useState<AppointmentInterface>();

  useEffect(() => {
    const listener = firestore()
      .collection("appointments")

      .doc(appointmentId)
      .onSnapshot((badgeDoc) => {
        if (badgeDoc.data()) {
          setAppointment(badgeDoc.data() as AppointmentInterface);
        }
      });

    return () => {
      listener();
    };
  }, [appointmentId]);

  return { appointment };
};
