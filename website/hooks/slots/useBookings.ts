import { getAllBookings } from "@models/slots/getDaySlots";
import { SlotBooking } from "@models/slots/Slot";
import { useEffect, useState } from "react";

export type slotP =
  | "Today"
  | "Tomorrow"
  | "Later"
  | "Older"
  | "All"
  | "Yesterday"
  | "Day before";

export const useBookings = () => {
  const [slotBookings, setSlotCol] = useState<SlotBooking[]>([]);
  const [period, setPeriod] = useState<slotP>("Today");

  // console.log("slot", slotBookings.length);

  useEffect(() => {
    const fetchSlotCol = async () => {
      const remoteSl = await getAllBookings(period);

      // console.log("remote", remoteSl.length);
      if (remoteSl.length) {
        setSlotCol(remoteSl);
      } else {
        // console.log("set to zero");
        setSlotCol([]);
      }
    };

    fetchSlotCol();
  }, [period]);

  return {
    slotBookings,
    period,
    setPeriod,
  };
};
