import { db } from "@config/firebase";
import { AppointmentInterface } from "@models/Appintment";
import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const now = Date.now();

export const useUserUpcomingAppointments = (uid: string) => {
  const [latestAppointments, setLatestAppointments] = useState<
    Partial<Record<CategoryTypes, AppointmentInterface>>
  >({});

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        where("startSlot", ">=", now),
        orderBy("startSlot", "asc")
      ),
      (docs) => {
        const upcomingAppointments: Partial<
          Record<CategoryTypes, AppointmentInterface>
        > = {};
        for (const doc of docs.docs) {
          const data = doc.data() as AppointmentInterface;

          if (
            data.category &&
            upcomingAppointments[data.category] &&
            data.status === "SCHEDULED"
          ) {
            const savedStart = upcomingAppointments[data.category]?.startSlot;
            const newStart = data.startSlot;

            if (newStart && savedStart && newStart < savedStart) {
              upcomingAppointments[data.category] = data;
            }
          } else if (data.category && data.status === "SCHEDULED") {
            upcomingAppointments[data.category] = data;
          }
        }

        setLatestAppointments(upcomingAppointments);
      }
    );
  }, [uid]);

  return {
    latestAppointments,
  };
};
