import { Badge } from "./PrizeV2";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";

export const createNewBadge = (): Badge => {
  return {
    id: uuidv4(),
    description: "",
    badgeId: "rank_1",
    prizes: [],
    rankStart: 1,
    name: "",
    frequency: "weekly",
    priority: 1,
    pinned: false,
  };
};

export const saveBadge = async (badge: Badge, gameId: string) => {
  await setDoc(doc(doc(db, "sbEvents", gameId), "badges", badge.id), badge);
};
