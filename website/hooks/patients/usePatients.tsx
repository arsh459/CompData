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
} from "firebase/firestore";
import { db } from "@config/firebase";

// export const usePatients = (doctorId?: string, sortBy?: "asc" | "desc") => {
//   const [patients, setPatients] = useState<UserInterface[]>([]);
//   const [fetched, setFetching] = useState<boolean>(false);

//   useEffect(() => {
//     if (doctorId) {
//       let q: Query | undefined = undefined;

//       q = query(
//         collection(db, "users"),
//         where("doctorIds", "array-contains", doctorId),
//         orderBy("lastConsultation", sortBy || "asc")
//       );

//       if (q) {
//         const unsub = onSnapshot(q, (snapshot) => {
//           const rUsers: UserInterface[] = [];
//           for (const doc of snapshot.docs) {
//             if (doc) {
//               rUsers.push(doc.data() as UserInterface);
//             }
//           }

//           setPatients(rUsers);
//           setTimeout(() => setFetching(true), 200);
//         });

//         return () => {
//           if (unsub) {
//             setFetching(false);
//             unsub();
//           }
//         };
//       }
//     }
//   }, [doctorId, sortBy]);

//   return {
//     patients,
//     fetched,
//   };
// };

export const usePatients = (
  doctorId?: string,
  sortBy?: "asc" | "desc",
  pageSize: number = 10
) => {
  const [patients, setPatients] = useState<UserInterface[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [lastPatient, setLastPatient] = useState<any>(null); // Type this according to your data structure

  useEffect(() => {
    const fetchPatients = async () => {
      if (!doctorId) return;

      let q: Query = query(
        collection(db, "users"),
        where("doctorIds", "array-contains", doctorId),
        // orderBy("lastConsultation", sortBy || "asc"),
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
  }, [doctorId, sortBy, pageSize]);

  const onNext = async () => {
    if (!nextExists || !lastPatient) return;

    let nextQuery: Query = query(
      collection(db, "users"),
      where("doctorIds", "array-contains", doctorId),
      // orderBy("lastConsultation", sortBy || "asc"),
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
