import { db } from "@config/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BadgeSection } from "./useBadgeSection";

export const useBadgeSections = (gameId: string, prizeId?: string) => {
  const [badgeSections, setBadgeSections] = useState<BadgeSection[]>();
  useEffect(() => {
    const getBadgeSections = async () => {
      if (gameId && prizeId) {
        const ref = doc(doc(db, "sbEvents", gameId), "badges", prizeId);
        const docs = await getDocs(collection(ref, "badgeSections"));
        const remoteSections: BadgeSection[] = [];
        for (const doc of docs.docs) {
          remoteSections.push(doc.data() as BadgeSection);
        }

        setBadgeSections(remoteSections);
      }
    };

    getBadgeSections();
  }, [gameId, prizeId]);

  return {
    badgeSections,
    setBadgeSections,
  };
};
