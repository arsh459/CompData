import { getSlotBooking } from "@models/slots/getDaySlots";
import { SlotBooking } from "@models/slots/Slot";
import { useEffect, useState } from "react";
// import { useUserV2 } from "@hooks/auth/useUserV2";

export const useSlotBooking = (slotId: string, bookingId: string) => {
  const [slotBooking, setSlotCol] = useState<SlotBooking>();

  useEffect(() => {
    const fetchSlotCol = async () => {
      const remoteSl = await getSlotBooking(slotId, bookingId);
      if (remoteSl) {
        setSlotCol(remoteSl);
      }
    };

    fetchSlotCol();
  }, [slotId, bookingId]);

  // const { user } = useUserV2(slotBooking?.uid);

  return {
    slotBooking,
    // user,
  };
};
