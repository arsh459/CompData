import { useEffect, useState } from "react";

import { UserInterface } from "@models/User/User";
import {
  collection,
  limit,

  // orderBy,
  query,
  Query,
  startAfter,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "@config/firebase";

export const useLeads = (flag: "seen" | "completed", pageSize: number = 10) => {
  const [leads, setLeads] = useState<UserInterface[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [lastPatient, setLastPatient] = useState<any>(null); // Type this according to your data structure

  useEffect(() => {
    const fetchLeads = async () => {
      let q: Query = query(
        collection(db, "users"),
        where(`leadFormFlags.${flag}`, "==", true),
        orderBy("authSigninTime", "desc"),
        // orderBy("lastConsultation", sortBy || "asc"),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);

      const rUsers: UserInterface[] = [];
      for (const doc of snapshot.docs) {
        rUsers.push(doc.data() as UserInterface);
      }

      setLeads(rUsers);
      setNextExists(snapshot.docs.length >= pageSize);
      if (snapshot.docs.length > 0) {
        setLastPatient(snapshot.docs[snapshot.docs.length - 1]);
      }
      setFetching(true);
    };

    fetchLeads();
  }, [flag, pageSize]);

  const onNext = async () => {
    if (!nextExists || !lastPatient) return;

    let nextQuery: Query = query(
      collection(db, "users"),
      where(`leadFormFlags.${flag}`, "==", true),
      orderBy("authSigninTime", "desc"),
      // orderBy("lastConsultation", sortBy || "asc"),
      startAfter(lastPatient),
      limit(pageSize)
    );

    const snapshot = await getDocs(nextQuery);

    const rUsers: UserInterface[] = [];
    for (const doc of snapshot.docs) {
      rUsers.push(doc.data() as UserInterface);
    }

    setLeads((prevPatients) => [...prevPatients, ...rUsers]);
    setNextExists(snapshot.docs.length >= pageSize);
    if (snapshot.docs.length > 0) {
      setLastPatient(snapshot.docs[snapshot.docs.length - 1]);
    }

    setFetching(true);
  };

  return {
    leads,
    fetched,
    onNext,
    nextExists,
  };
};
