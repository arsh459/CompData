import { useEffect, useState } from "react";

import { UserInterface } from "@models/User/User";
import {
  collection,
  limit,
  query,
  Query,
  startAfter,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@config/firebase";

export const useUsersBySignup = (pageSize: number) => {
  const [patients, setPatients] = useState<UserInterface[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [lastPatient, setLastPatient] = useState<any>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const q: Query = query(
        collection(db, "users"),
        orderBy("authSigninTime", "desc"),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);

      const rUsers: UserInterface[] = [];
      for (const doc of snapshot.docs) {
        rUsers.push(doc.data() as UserInterface);
      }

      setPatients(rUsers);
      setNextExists(snapshot.docs.length >= pageSize);

      if (snapshot.docs.length > 0) {
        setLastPatient(snapshot.docs[snapshot.docs.length - 1]);
      }
      setFetching(true);
    };

    fetchPatients();
  }, [pageSize]);

  const onNext = async () => {
    if (!nextExists || !lastPatient) return;
    let nextQuery: Query = query(
      collection(db, "users"),
      orderBy("authSigninTime", "desc"),
      startAfter(lastPatient),
      limit(pageSize)
    );

    const snapshot = await getDocs(nextQuery);
    const rUsers: UserInterface[] = [];
    for (const doc of snapshot.docs) {
      rUsers.push(doc.data() as UserInterface);
    }
    setPatients((prevPatients) => [...prevPatients, ...rUsers]);
    setNextExists(snapshot.docs.length >= pageSize);
    if (snapshot.docs.length > 0) {
      setLastPatient(snapshot.docs[snapshot.docs.length - 1]);
    }

    setFetching(true);
  };

  return {
    patients,
    fetched,
    onNext,
    nextExists,
  };
};
