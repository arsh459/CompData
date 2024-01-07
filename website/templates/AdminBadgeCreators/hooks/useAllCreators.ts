import { db } from "@config/firebase";
import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useAllCreators = (gameId?: string, badgeId?: string) => {
  const [creators, setCreators] = useState<UserInterface[]>([]);

  useEffect(() => {
    const getCreators = async () => {
      if (gameId && badgeId) {
        const badgeDoc = await getDoc(
          doc(doc(db, "sbEvents", gameId), "badges", badgeId)
        );

        if (badgeDoc) {
          const badge = badgeDoc.data() as Badge;

          if (badge.creatorIds) {
            const querry = query(
              collection(db, "users"),
              where("uid", "in", badge.creatorIds)
            );
            const creatorsDocs = await getDocs(querry);

            if (creatorsDocs.docs.length) {
              const remoteCreators: UserInterface[] = [];

              for (const doc of creatorsDocs.docs) {
                remoteCreators.push(doc.data() as UserInterface);
              }

              setCreators(remoteCreators);
            }
          }
        }
      }
    };

    getCreators();
  }, [gameId, badgeId]);

  return { creators };
};
