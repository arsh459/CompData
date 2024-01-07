import { AutoRoomIDs } from "@models/ChatBot/insights";
import { EmojiItem } from "./useSakhiInsightsV2";
import firestore from "@react-native-firebase/firestore";

export const remoteUpdatePeriodObj = async (
  uid: string,
  id: string,
  recommendation: EmojiItem,
  roomId: AutoRoomIDs
  // insight: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .doc(id)
    .update({
      [`recommendations.${roomId}`]: recommendation,
    });
};

// export const remoteUpdatePeriodObjInsight = async (
//   uid: string,
//   id: string,
//   insight: string

//   // insight: string
// ) => {
//   await firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("periodDates")
//     .doc(id)
//     .update({
//       insight,
//     });
// };
