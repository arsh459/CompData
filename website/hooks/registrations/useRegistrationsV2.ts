// import { useUserEvents } from "@hooks/editEvent/useUserEvents";
import { db } from "@config/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, doc } from "firebase/firestore";
// import { sbEventPayment } from "pages/api/payments/utils/interface";
// import { Unsubscribe } from "firebase/auth";
import { MessageInterface } from "@templates/editEvent/Registrations/Message/DashboardMessage";
import { convertPayToMessage } from "./utils";
// import { useEventKPIs } from "./useEventKPIs";
// import { sbEventPayment } from "@utils/payments/interface";
import { Registration } from "@models/Registrations/Registrations";
// import { useRegistrationEvents } from "./useRegistrationEvents";
import { useRegistrationCohorts } from "./useRegistrationCohorts";

export const useRegistrationsV2 = (uid: string) => {
  // const { userEvents } = useUserEvents(uid);
  const [payEvents, setPayEvents] = useState<MessageInterface[]>([]);
  const [eventIdObj, setEventIds] = useState<{ [id: string]: boolean }>({});

  // const { remoteEvents } = useRegistrationEvents(eventIdObj);
  const { remoteCohorts, remoteEvents } = useRegistrationCohorts(eventIdObj);

  useEffect(() => {
    const payRef = collection(
      doc(collection(db, "users"), uid),
      "registrations"
    );

    const unsub = onSnapshot(payRef, (querySnapshot) => {
      const remotePayments: MessageInterface[] = [];
      const remoteEventIds: { [id: string]: boolean } = {};
      querySnapshot.forEach((doc) => {
        const rmTmp = doc.data() as Registration;

        remoteEventIds[rmTmp.eventId] = true;
        remotePayments.push(convertPayToMessage(rmTmp));
      });

      setPayEvents(
        remotePayments.sort((x, y) => y.createdUnix - x.createdUnix)
      );
      setEventIds(remoteEventIds);

      return () => {
        if (unsub) {
          unsub();
        }
      };
    });
  }, [uid]);

  return {
    payEvents,
    remoteEvents,
    remoteCohorts,
    // earnings,
    // views,
    // students,
  };
};
