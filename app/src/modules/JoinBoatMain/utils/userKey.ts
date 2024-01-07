// import { db } from "@config/firebase";
import { LeaderBoard } from "@models/Leader/LeaderBoard";
// import { getDocs, collection, query, where } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";

export const checkoutKeyVerify = async (key: string, uid: string) => {
  //   .toLowerCase());
  const keyRef = firestore().collection("leaderBoard");

  const userKeyQuery = keyRef.where("userKey", "==", key.trim().toLowerCase());

  const querySnapshot = await userKeyQuery.get();

  if (querySnapshot.docs.length === 0) {
    return true;
  }

  if (querySnapshot.docs.length === 1) {
    return (querySnapshot.docs[0].data() as LeaderBoard).uid === uid
      ? true
      : false;
  }

  return false;
};

export const generateFormattedKey = (userKey: string) => {
  const withoutDot = userKey.trim().replace(/\./g, "");
  const withoutUnderscore = withoutDot; //.trim().replace(/\_/g, "");
  const withoutAtRate = withoutUnderscore.trim().replace(/\@/g, "");
  const withoutSpl = withoutAtRate.trim().replace("/", "");
  const withoutHyphen = withoutSpl.trim().replace(/-/, " ");
  const listingNameUniformSpaces = withoutHyphen.replace(/\s\s+/g, " ");
  const finalKey = listingNameUniformSpaces.replace(/\s+/g, "-");
  return finalKey;
};
