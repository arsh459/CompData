import {
  createNewSlotCollection,
  getDaySlots,
  saveSlotCollection,
} from "@models/slots/getDaySlots";
import {
  dayTypes,
  SlotCollection,
  slotStatus,
  timeLabel,
} from "@models/slots/Slot";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useSlotCollection = (day: dayTypes) => {
  const [slotCol, setSlotCol] = useState<SlotCollection>();

  useEffect(() => {
    const fetchSlotCol = async () => {
      if (day) {
        const remoteSl = await getDaySlots(day);
        if (remoteSl) {
          setSlotCol(remoteSl);
        } else {
          setSlotCol(createNewSlotCollection(day));
        }
      }
    };

    fetchSlotCol();
  }, [day]);

  const addNewSlot = () => {
    setSlotCol((prev) => {
      if (prev) {
        return {
          ...prev,
          slots: [
            ...prev.slots,
            {
              id: uuidv4(),
              start: "9:30",
              end: "10:00",
              status: "AVAILABLE",
              label: "Morning",
            },
          ],
        };
      }
    });
  };

  const removeSlot = (index: number) => {
    setSlotCol((prev) => {
      if (prev) {
        return {
          ...prev,
          slots: [
            ...prev.slots.slice(0, index),
            ...prev.slots.slice(index + 1, prev.slots.length),
          ],
        };
      }
    });
  };

  const updateRemote = async () => {
    if (slotCol) await saveSlotCollection(slotCol);
  };

  const updateLocalLabel = (key: string, value: timeLabel, index: number) => {
    setSlotCol((prev) => {
      if (prev) {
        return {
          ...prev,
          slots: [
            ...prev.slots.slice(0, index),
            {
              ...prev.slots[index],
              [key]: value,
            },
            ...prev.slots.slice(index + 1, prev.slots.length),
          ],
        };
      }
    });
  };
  const updateLocalStatus = (key: string, value: slotStatus, index: number) => {
    setSlotCol((prev) => {
      if (prev) {
        return {
          ...prev,
          slots: [
            ...prev.slots.slice(0, index),
            {
              ...prev.slots[index],
              [key]: value,
            },
            ...prev.slots.slice(index + 1, prev.slots.length),
          ],
        };
      }
    });
  };
  const updateLocalTime = (
    key: "start" | "end",
    value: string,
    index: number
  ) => {
    setSlotCol((prev) => {
      if (prev) {
        return {
          ...prev,
          slots: [
            ...prev.slots.slice(0, index),
            {
              ...prev.slots[index],
              [key]: value,
            },
            ...prev.slots.slice(index + 1, prev.slots.length),
          ],
        };
      }
    });
  };

  return {
    slotCol,
    addNewSlot,
    removeSlot,
    updateRemote,
    updateLocalTime,
    updateLocalLabel,
    updateLocalStatus,
  };
};
