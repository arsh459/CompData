import { db } from "@config/firebase";
import { UserInterface } from "@models/User/User";
import {
  collection,
  onSnapshot,
  Query,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useInvitedUsers = (pageId?: string, origin?: boolean) => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  // console.log("or", origin,  pageId);

  useEffect(() => {
    let q: Query;
    if (origin) {
      q = query(
        collection(db, "users"),
        pageId
          ? where("origins", "array-contains", pageId)
          : where("hasOrigin", "==", true)
      );
    } else {
      q = query(
        collection(db, "users"),
        pageId
          ? where("invitedPageId", "==", pageId)
          : where("invitedPageId", ">=", "")
      );
    }

    onSnapshot(q, (docs) => {
      const remDocs: UserInterface[] = [];
      for (const doc of docs.docs) {
        // console.log("doc", doc.data());
        remDocs.push(doc.data() as UserInterface);
      }

      const sortedDocs = remDocs.sort(
        (a, b) =>
          (b.companyCodes?.length ? b.companyCodes.length : 0) -
          (a.companyCodes?.length ? a.companyCodes.length : 0)
      );

      setUsers(sortedDocs);
    });
  }, [pageId, origin]);

  return {
    users,
  };
};
