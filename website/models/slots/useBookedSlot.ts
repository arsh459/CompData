import { db } from "@config/firebase";
import { useAuth } from "@hooks/auth/useAuth";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { SlotBooking } from "./Slot";

export const useBookedSlots = () => {
  const { uid } = useAuth();
  const [bookedSlot, setBookedSlot] = useState<SlotBooking>();

  useEffect(() => {
    const getBookedSlot = async () => {
      const ref = query(
        collectionGroup(db, "slotBooking"),
        where("uid", "==", uid),
        orderBy("createdOn", "desc"),
        limit(1)
      );

      const remoteDocs = await getDocs(ref);

      if (remoteDocs.docs.length) {
        setBookedSlot(remoteDocs.docs[0].data() as SlotBooking);
      }
    };

    getBookedSlot();
  }, [uid]);

  return { bookedSlot };
};
