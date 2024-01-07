import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";
import { SlotBooking, SlotObj } from "./Slot";
import { useEffect, useState } from "react";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getHrAndMin, getHrInMS, getISTFromMillis, getMinInMS } from "./utils";

const intial = {
  uid: "",
  startUnix: 0,
  endUnix: 0,
  rawString: "",
};

const id = uuidv4();

export const useSlotBooking = (dateUnix?: number, slotObject?: SlotObj) => {
  const { state } = useAuthContext();
  const [data, setData] = useState<SlotBooking>({ id, ...intial });

  useEffect(() => {
    if (state.uid && dateUnix && slotObject) {
      const uid = state.uid;

      const { startHr, startMin, endHr, endMin } = getHrAndMin(slotObject);

      const startUnix = dateUnix + getHrInMS(startHr) + getMinInMS(startMin);
      const endUnix = dateUnix + getHrInMS(endHr) + getMinInMS(endMin);

      const date = getISTFromMillis(dateUnix);
      const rawString = `${date.weekdayShort}, ${date.toFormat("dd")} ${
        date.monthShort
      }, ${slotObject.start} - ${slotObject.end} ${slotObject.label}`;

      setData((prev) => ({ ...prev, uid, startUnix, endUnix, rawString }));
    } else {
      setData((prev) => ({ ...prev, ...intial }));
    }
  }, [state.uid, dateUnix, slotObject]);

  const saveBookingSlot = async (slotId?: string) => {
    if (
      slotId &&
      data.uid !== "" &&
      data.startUnix !== 0 &&
      data.endUnix !== 0 &&
      data.rawString !== ""
    ) {
      await firestore()
        .collection("slots")
        .doc(slotId)
        .collection("slotBooking")
        .doc(data.id)
        .set(data, { merge: true });
    } else {
      throw Error("Insufficient Data");
    }
  };

  return { saveBookingSlot };
};
