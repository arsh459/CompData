import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { UserInterface } from "@models/User/User";

export type stringKeysBootcamp = "name" | "creatorId";
export type stringArrayKeysBootcamp = "text" | "link" | "type";

export const useBootcampUsers = (id: string) => {
  const [bootcampUsers, setBootcampUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    if (id) {
      const listener = onSnapshot(
        query(
          collection(db, "users"),
          where("bootcampDetails.bootcampId", "==", id)
        ),
        (bootcampUsers) => {
          const remoteUsers: UserInterface[] = [];
          for (const doc of bootcampUsers.docs) {
            remoteUsers.push(doc.data() as UserInterface);
          }

          setBootcampUsers(remoteUsers);
        }
      );

      return () => {
        listener();
      };
    }
  }, [id]);

  return {
    bootcampUsers,
  };
};
