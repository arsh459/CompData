import { db } from "@config/firebase";
import { UserInterface } from "@models/User/User";
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import { format } from "date-fns";

export interface PaidCard {
  uid: string;
  ending: string;
  name: string;
  phone: string;
  fp: number;
  badgeId: string;
  nutritionBadgeId: string;
  user: UserInterface;
  paymentUnix: number;
}

export const usePaidUsers = () => {
  const [paidCards, setPaidCards] = useState<PaidCard[]>([]);

  useEffect(() => {
    const now = Date.now();

    const getWebPaid = async () => {
      const paidUsers = await getDocs(
        query(
          collection(
            doc(db, "appSubscriptions", "0cPvVrnphNJBnvvOM9Zf"),
            "userSubs"
          ),
          where("paidPeriodEndsOn", ">=", now),
          orderBy("paidPeriodEndsOn", "asc")
        )
      );

      const users: PaidCard[] = [];
      const userPromises: Promise<DocumentSnapshot<DocumentData>>[] = [];
      const subObjs: UserAppSubscription[] = [];
      for (const usr of paidUsers.docs) {
        const appSub = usr.data() as UserAppSubscription;

        const user = getDoc(doc(db, "users", appSub.uid));
        userPromises.push(user);
        subObjs.push(appSub);
      }

      const allUserObjs = await Promise.all(userPromises);
      const userMap: { [uid: string]: UserInterface } = {};
      for (const remoteUserObj of allUserObjs) {
        const fetchObj = remoteUserObj.data() as UserInterface | undefined;
        if (fetchObj) {
          userMap[fetchObj.uid] = fetchObj;
        }
      }

      for (const sub of subObjs) {
        const userFromMap = userMap[sub.uid];
        if (userFromMap) {
          const fpC = userFromMap.fpCredit ? userFromMap.fpCredit : 0;
          const fpD = userFromMap.fpDebit ? userFromMap.fpDebit : 0;

          users.push({
            uid: userFromMap.uid,
            name: userFromMap?.name ? userFromMap.name : "NO NAME",
            phone: userFromMap.phone ? userFromMap.phone : "NO PHONE",
            fp: fpC - fpD,
            ending: sub.paidPeriodEndsOn
              ? format(new Date(sub.paidPeriodEndsOn), "d MMM yyyy")
              : "NOT ACTIVE",
            badgeId: userFromMap.badgeId ? userFromMap.badgeId : "",
            nutritionBadgeId: userFromMap.nutritionBadgeId
              ? userFromMap.nutritionBadgeId
              : "",
            user: userFromMap,
            paymentUnix: sub.freeTrialStartedOn,
          });
        }
      }

      setPaidCards(users);
    };

    getWebPaid();
  }, []);

  return {
    paidCards,
  };
};
