import { db } from "@config/firebase";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const alotAccess = async (
  appSubId: string,
  uid: string,
  durationInDays: number
) => {
  const previousSub = (
    await getDoc(doc(doc(db, "appSubscriptions", appSubId), "userSubs", uid))
  ).data() as UserAppSubscription | undefined;

  if (previousSub) {
    // await updateDoc(
    //   doc(doc(db, "appSubscriptions", appSubId), "userSubs", uid),
    //   {
    //     uid,
    //     paidPeriodEndsOn: increment(24 * 60 * 60 * 1000 * durationInDays),
    //   }
    // );
  } else {
    await setDoc(doc(doc(db, "appSubscriptions", appSubId), "userSubs", uid), {
      uid,
      paidPeriodEndsOn: Date.now() + 24 * 60 * 60 * 1000 * durationInDays,
    });
  }
};
