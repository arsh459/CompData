import { db } from "@config/firebase";
import { UserInterface } from "@models/User/User";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PaidCard } from "./usePaidUsers";

export const useWatchUsers = () => {
  const [paidCards, setPaidCards] = useState<PaidCard[]>([]);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    const getWebPaid = async () => {
      const paidUsers = await getDocs(
        query(collection(db, "users"), where("watching", "==", true))
      );

      const users: PaidCard[] = [];
      for (const usr of paidUsers.docs) {
        const userFromMap = usr.data() as UserInterface;

        const fpC = userFromMap.fpCredit ? userFromMap.fpCredit : 0;
        const fpD = userFromMap.fpDebit ? userFromMap.fpDebit : 0;

        users.push({
          uid: userFromMap.uid,
          name: userFromMap?.name ? userFromMap.name : "NO NAME",
          phone: userFromMap.phone ? userFromMap.phone : "NO PHONE",
          fp: fpC - fpD,
          ending: "",
          badgeId: userFromMap.badgeId ? userFromMap.badgeId : "",
          nutritionBadgeId: userFromMap.nutritionBadgeId
            ? userFromMap.nutritionBadgeId
            : "",
          user: userFromMap,
          paymentUnix: -1,
        });
      }

      setPaidCards(users);
    };

    getWebPaid();
  }, [refresh]);

  return {
    paidCards,
    setRefresh,
  };
};
