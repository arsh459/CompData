import firestore from "@react-native-firebase/firestore";
import { Badge } from "./Prizes";

// export const createNewBadge = (): Badge => {
//   return {
//     id: uuidv4(),
//     description: "",
//     badgeId: "rank_1",
//     prizes: [],
//     rankStart: 1,
//     name: "",
//     frequency: "weekly",
//     priority: 1,
//     pinned: false,
//   };
// };

export const saveBadge = async (badge: Badge, gameId: string) => {
  await firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("badges")
    .doc(badge.id)
    .set(badge);
  // setDoc(doc(doc(db, "sbEvents", gameId), "badges", badge.id), badge);
};
