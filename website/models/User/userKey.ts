import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "config/firebase";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

export const checkoutKeyVerify = async (key: string, uid: string) => {
  //   console.log("eventId", eventId);
  //   console.log("id", id.trim().toLowerCase());
  //   console.log("eventRef", eventRef);
  const keyRef = collection(db, "leaderBoard");

  const userKeyQuery = query(
    keyRef,
    where("userKey", "==", key.trim().toLowerCase())
  );

  //   console.log("inviteQuery", inviteQuery);

  const querySnapshot = await getDocs(userKeyQuery);

  if (querySnapshot.docs.length === 0) {
    return true;
  }

  if (querySnapshot.docs.length === 1) {
    return (querySnapshot.docs[0].data() as LeaderBoard).uid === uid
      ? true
      : false;
  }

  //   console.log("querySnapshot", querySnapshot);
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
