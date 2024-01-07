import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useAppointments = () => {
  const [latestAppointments, setLatestAppointment] = useState<
    AppointmentInterface[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);

  const { state } = useAuthContext();

  useEffect(() => {
    const listener = firestore()
      .collection("appointments")
      .where("patientId", "==", state.uid)
      .orderBy("startSlot", "desc")
      .onSnapshot((remoteDocs) => {
        const remoteTestimonials: AppointmentInterface[] = [];
        const upcomingApps: AppointmentInterface[] = [];

        if (remoteDocs && remoteDocs.docs.length) {
          for (const test of remoteDocs.docs) {
            const appItem = test.data() as AppointmentInterface;

            remoteTestimonials.push(appItem);
            if (appItem.endSlot && appItem.endSlot > Date.now()) {
              upcomingApps.push(appItem);
            }
          }
        }

        setLatestAppointment(upcomingApps);
        setAppointments(remoteTestimonials);
        setLoading(false);
      });

    return () => {
      listener();
    };
  }, [state.uid]);

  return {
    appointments,
    latestAppointments,
    loading,
  };
};
