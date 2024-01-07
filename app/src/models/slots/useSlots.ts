import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { days, SlotCollection, SlotObj, timeLabel } from "./Slot";
import { checkPeriod, getISTFromMillis } from "./utils";
import { DateTime } from "luxon";

export const useSlots = (dateUnix: number) => {
  const [slotId, setSlotId] = useState<string>();
  const [timePeriod, setTimePeriod] = useState<timeLabel>(
    DateTime.now().toFormat("a") === "AM" ? "Morning" : "Evening"
  );
  const [slotDate, setSlotDate] = useState<number>(dateUnix);
  const [slotTime, setSlotTime] = useState<SlotObj>();
  const [periodSlots, setPeriodSlots] = useState<{
    [key in timeLabel]: SlotObj[];
  }>({ Morning: [], Evening: [] });

  useEffect(() => {
    const getCollection = async () => {
      const dayIndex = getISTFromMillis(slotDate).weekday % 7;

      const remoteDocs = await firestore()
        .collection("slots")
        .where("day", "==", days[dayIndex])
        .get();

      if (remoteDocs.docs.length) {
        const slotCollecton = remoteDocs.docs[0].data() as SlotCollection;
        const remotePeriodSlots: { [key in timeLabel]: SlotObj[] } = {
          Morning: [],
          Evening: [],
        };

        for (const slot of slotCollecton.slots) {
          remotePeriodSlots[checkPeriod(slot)].push(slot);
        }

        setPeriodSlots(remotePeriodSlots);
        setSlotId(slotCollecton.id);
      } else {
        setPeriodSlots({ Morning: [], Evening: [] });
      }
    };

    getCollection();
  }, [dateUnix, slotDate, timePeriod]);

  return {
    slotId,
    slots: periodSlots[timePeriod],
    timePeriod,
    setTimePeriod,
    slotDate,
    setSlotDate,
    slotTime,
    setSlotTime,
  };
};
