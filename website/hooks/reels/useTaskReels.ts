import { useEffect, useState } from "react";

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
import { Task } from "@models/Tasks/Task";

export const useTaskReels = (pageSize: number = 10) => {
  const [reels, setReels] = useState<Task[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [lastReel, setLastReels] = useState<any>(null); // Type this according to your data structure

  useEffect(() => {
    const fetchPatients = async () => {
      let q: Query = query(
        collection(db, "tasks"),
        where("isReel", "==", true),
        orderBy("priority", "desc"),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);

      const rUsers: Task[] = [];
      for (const doc of snapshot.docs) {
        rUsers.push(doc.data() as Task);
      }

      setReels(rUsers);
      setNextExists(snapshot.docs.length >= pageSize);
      if (snapshot.docs.length > 0) {
        setLastReels(snapshot.docs[snapshot.docs.length - 1]);
      }
      setFetching(true);
    };

    fetchPatients();
  }, [pageSize]);

  const onNext = async () => {
    if (!nextExists || !lastReel) return;

    let nextQuery: Query = query(
      collection(db, "tasks"),
      where("isReel", "==", true),
      orderBy("priority", "desc"),
      startAfter(lastReel),
      limit(pageSize)
    );

    const snapshot = await getDocs(nextQuery);

    const rUsers: Task[] = [];
    for (const doc of snapshot.docs) {
      rUsers.push(doc.data() as Task);
    }

    setReels((prevPatients) => [...prevPatients, ...rUsers]);
    setNextExists(snapshot.docs.length >= pageSize);
    if (snapshot.docs.length > 0) {
      setLastReels(snapshot.docs[snapshot.docs.length - 1]);
    }

    setFetching(true);
  };

  return {
    reels,
    fetched,
    onNext,
    nextExists,
  };
};
