// import { RUNNER_GAME } from "@constants/gameStats";
import { db } from "@config/firebase";
import { slotP } from "@hooks/slots/useBookings";
import { getStartEnd } from "@models/slots/getDaySlots";
import { UserInterface } from "@models/User/User";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
  orderBy,
} from "firebase/firestore";

import { useEffect, useState } from "react";

export const useMotivators = () => {
  const [motivators, setMotivators] = useState<{
    [uid: string]: UserInterface;
  }>({});
  const [motivated, setMotivatedUsers] = useState<UserInterface[]>([]);
  const [period, setPeriod] = useState<slotP>("Today");

  useEffect(() => {
    const getMotivatedUsers = async () => {
      let mots: QuerySnapshot<DocumentData> | null = null;
      if (period === "All") {
        mots = await getDocs(
          query(collection(db, "users"), where("motivatedBy", "!=", ""))
        );
      } else {
        const { st, en } = getStartEnd(period);

        mots = await getDocs(
          query(
            collection(db, "users"),
            where("motivatedOn", ">=", st),
            where("motivatedOn", "<=", en),
            orderBy("motivatedOn", "desc")
          )
        );
      }

      const remoteUsers: UserInterface[] = [];
      const remoteMotivators: { [uid: string]: UserInterface } = {};
      for (const mot of mots.docs) {
        const userObj = mot.data() as UserInterface;

        const motivatedByUID = userObj.motivatedBy;
        if (motivatedByUID && !remoteMotivators[motivatedByUID]) {
          const motivatedByCoach = await getDoc(
            doc(db, "users", motivatedByUID)
          );

          if (motivatedByCoach.data()) {
            const coach = motivatedByCoach.data() as UserInterface;
            remoteMotivators[coach.uid] = coach;
          }
        }

        remoteUsers.push(userObj);
      }

      setMotivatedUsers(remoteUsers);
      setMotivators(remoteMotivators);
    };

    getMotivatedUsers();
  }, [period]);

  return {
    motivated,
    motivators,
    period,
    setPeriod,
  };
};
