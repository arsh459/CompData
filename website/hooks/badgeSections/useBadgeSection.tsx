import { db } from "@config/firebase";
import { uuidv4 } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
export interface BadgeSection {
  sectionId: string;
  sectionName: string;
  nbTasks: number;
  nbFp: number;
  priority: number;
}
const useBadgeSection = (
  gameId: string,
  prizeId: string,
  sectionId: string
) => {
  const [badgeSection, setBadgeSection] = useState<BadgeSection>();
  // console.log({ badgeSection });

  useEffect(() => {
    const getBadgeSection = async () => {
      // console.log({ gameId, prizeId, sectionId });
      if (gameId && prizeId && sectionId) {
        const ref = doc(doc(db, "sbEvents", gameId), "badges", prizeId);
        const document = await getDoc(doc(ref, "badgeSections", sectionId));
        const data = document.data();
        if (data) {
          const bS = data as BadgeSection;
          setBadgeSection(bS);
        } else {
          setBadgeSection({
            sectionId: uuidv4(),
            sectionName: "",
            nbTasks: 0,
            nbFp: 0,
            priority: 0,
          });
        }
      }
    };
    getBadgeSection();
  }, [gameId, prizeId, sectionId]);

  return { badgeSection, setBadgeSection };
};

export default useBadgeSection;
