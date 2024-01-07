import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getHrAndMin, getHrInMS, getISTFromMillis, getMinInMS } from "./utils";
import { SlotBooking, SlotObj } from "./Slot";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { useAuth } from "@hooks/auth/useAuth";

const intial = {
  uid: "",
  startUnix: 0,
  endUnix: 0,
  rawString: "",
};

const id = uuidv4();

export const useSlotBooking = (dateUnix?: number, slotTime?: SlotObj) => {
  const { uid } = useAuth();
  const [data, setData] = useState<SlotBooking>({ id, ...intial });

  useEffect(() => {
    if (uid && dateUnix && slotTime) {
      const { startHr, startMin, endHr, endMin } = getHrAndMin(slotTime);

      const startUnix = dateUnix + getHrInMS(startHr) + getMinInMS(startMin);
      const endUnix = dateUnix + getHrInMS(endHr) + getMinInMS(endMin);

      const date = getISTFromMillis(dateUnix);
      const rawString = `${date.weekdayShort}, ${date.toFormat("dd")} ${
        date.monthShort
      }, ${slotTime.start} - ${slotTime.end} ${slotTime.label}`;

      setData((prev) => ({ ...prev, uid, startUnix, endUnix, rawString }));
    } else {
      setData((prev) => ({ ...prev, ...intial }));
    }
  }, [uid, dateUnix, slotTime]);

  const saveBookingSlot = async (slotId?: string) => {
    if (
      slotId &&
      data.uid !== "" &&
      data.startUnix !== 0 &&
      data.endUnix !== 0 &&
      data.rawString !== ""
    ) {
      await setDoc(
        doc(doc(db, "slots", slotId), "slotBooking", data.id),
        data,
        { merge: true }
      );
    } else {
      throw Error("Insufficient Data");
    }
  };

  return { saveBookingSlot };
};
