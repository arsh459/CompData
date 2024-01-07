import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { SlotBooking } from "./Slot";

export const useBookedSlots = () => {
  const { state } = useAuthContext();
  const [bookedSlot, setBookedSlot] = useState<SlotBooking>();

  useEffect(() => {
    const getBookedSlot = async () => {
      const remoteDocs = await firestore()
        .collectionGroup("slotBooking")
        .where("uid", "==", state.uid)
        .orderBy("createdOn", "desc")
        .limit(1)
        .get();

      if (remoteDocs.docs.length) {
        setBookedSlot(remoteDocs.docs[0].data() as SlotBooking);
      }
    };

    getBookedSlot();
  }, [state.uid]);

  return { bookedSlot };
};
