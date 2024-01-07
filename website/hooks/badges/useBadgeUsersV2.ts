import { useEffect, useState } from "react";

import { UserInterface } from "@models/User/User";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@config/firebase";

export const useBadgeUsersV2 = (badgeId?: string, fetch?: boolean) => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    if (badgeId) {
      const fetchUsers = async () => {
        const wQ = query(
          collection(db, "users"),
          where("badgeId", "==", badgeId)
        );
        const nQ = query(
          collection(db, "users"),
          where("nutritionBadgeId", "==", badgeId)
        );

        // console.log("badgeId", badgeId);

        const docs1 = await getDocs(wQ);

        const docs2 = await getDocs(nQ);

        const remoteUsers: UserInterface[] = [];
        for (const doc of docs1.docs) {
          //   console.log("wq", doc.data()?.name);
          remoteUsers.push(doc.data() as UserInterface);
        }

        for (const doc of docs2.docs) {
          //   console.log("nq", doc.data()?.name);
          remoteUsers.push(doc.data() as UserInterface);
        }

        setUsers(remoteUsers);
      };
      fetch && fetchUsers();
    }
  }, [badgeId, fetch]);

  return {
    users,
  };
};
