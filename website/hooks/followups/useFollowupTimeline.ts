import { useUserAppointments } from "@hooks/appointments/useUserAppointments";
import { useFollowups } from "./useFollowups";
import { useEffect, useState } from "react";
import { userFollowup } from "@models/User/User";
import { AppointmentInterface } from "@models/Appintment";

export type fTypes = "followup" | "appointment";

export interface frontendFollowup extends userFollowup {
  time: number;
  fType: fTypes;
}

export interface appointmentFollowup extends AppointmentInterface {
  time: number;
  fType: fTypes;
}

export const useFollowupTimeline = (uid?: string) => {
  const { followups } = useFollowups(uid);
  const { appointments } = useUserAppointments(uid);

  const [finalList, setFinalList] = useState<
    (frontendFollowup | appointmentFollowup)[]
  >([]);

  useEffect(() => {
    const updatedFollowupsAcc: frontendFollowup[] = [];
    const updatedAppointmentsAcc: appointmentFollowup[] = [];

    const updatedFollowups = followups.reduce((acc, item) => {
      return [
        ...acc,
        { ...item, time: item.followupTime, fType: "followup" as fTypes },
      ];
    }, updatedFollowupsAcc);

    const updatedAppointments = appointments.reduce((acc, item) => {
      if (item.startSlot) {
        return [
          ...acc,
          { ...item, time: item.startSlot, fType: "appointment" as fTypes },
        ];
      } else return acc;
    }, updatedAppointmentsAcc);

    const combinedList = [...updatedFollowups, ...updatedAppointments].sort(
      (x, y) => x.time - y.time
    );
    setFinalList(combinedList);
  }, [followups, appointments]);

  return { finalList };
};
