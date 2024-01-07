import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewLive } from "@models/Workouts/createUtils";
import { LiveClass } from "@models/Workouts/LiveClass";
import { useCallback, useEffect, useState } from "react";

export const useNewLive = (
  uid: string,
  editFlag?: boolean,
  editingClass?: LiveClass,
  initDay?: number
) => {
  const [newLive, updateNewLive] = useState<LiveClass | undefined>(() =>
    editFlag && editingClass ? editingClass : undefined
  );

  useEffect(() => {
    if (!editFlag) {
      // console.log("making new post");
      updateNewLive(createNewLive(uid, initDay));
    } else if (editFlag && editingClass) {
      updateNewLive(editingClass);
    }
  }, [editFlag, editingClass, initDay, uid]);

  const onUpdateName = (name: string) => {
    updateNewLive((prev) => {
      if (prev)
        return {
          ...prev,
          name: name,
          // videoKey: generateEventKey(name),
        };
    });
  };

  const onUpdateDescription = (description: string) => {
    updateNewLive((prev) => {
      if (prev)
        return {
          ...prev,
          description: description,
        };
    });
  };

  const onKeyChange = (liveKey: string) => {
    updateNewLive((prev) => {
      if (prev)
        return {
          ...prev,
          liveKey,
        };
    });
  };

  const isFreeUpdate = (isFree: boolean) => {
    updateNewLive((prev) => {
      if (prev) {
        return {
          ...prev,
          isFree,
        };
      }
    });
  };

  const onCalorieUpdate = (calories: number) => {
    updateNewLive((prev) => {
      if (prev) {
        return {
          ...prev,
          calories,
        };
      }
    });
  };

  const onDurationUpdate = (duration: number) => {
    updateNewLive((prev) => {
      if (prev) {
        return {
          ...prev,
          duration,
        };
      }
    });
  };

  const onSlotsAdd = useCallback((newSlot: string) => {
    updateNewLive((prev) => {
      if (prev && prev.slots) {
        return {
          ...prev,
          slots: [...prev.slots, newSlot],
        };
      } else if (prev) {
        return {
          ...prev,
          slots: [newSlot],
        };
      }
    });
  }, []);

  const onSlotsDelete = (index: number) => {
    updateNewLive((prev) => {
      if (prev && prev.slots) {
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

  const onSlotUpdate = (value: string, index: number) => {
    updateNewLive((prev) => {
      if (prev && prev.slots) {
        return {
          ...prev,
          slots: [
            ...prev.slots.slice(0, index),
            value,
            ...prev.slots.slice(index + 1, prev.slots.length),
          ],
        };
      }
    });
  };

  const onSlotSet = (newSlots: string[]) => {
    updateNewLive((prev) => {
      if (prev) {
        return {
          ...prev,
          slots: newSlots,
        };
      }
    });
  };

  const onLinkUpdate = (link: string) => {
    updateNewLive((prev) => {
      if (prev) {
        return {
          ...prev,
          link,
        };
      }
    });
  };

  const onMediaUpload = useCallback((newFile: CloudinaryMedia | AWSMedia) => {
    updateNewLive((prev) => {
      if (prev) {
        return {
          ...prev,
          media: newFile,
        };
      }
    });
  }, []);

  const onMediaDelete = () => {
    updateNewLive((prev) => {
      if (prev) {
        return {
          ...prev,
          media: undefined,
        };
      }
    });
  };

  const onDaysUpdate = (day: number) => {
    updateNewLive((prev) => {
      if (prev && prev.days && !prev.days.includes(day)) {
        // console.log("add");
        return {
          ...prev,
          days: [...prev.days, day],
        };
      } else if (prev && prev.days && prev.days.includes(day)) {
        const ind = prev.days.indexOf(day);
        // console.log("remove", ind, prev.days.splice(ind, 1));
        if (ind > -1) {
          return {
            ...prev,
            days: [
              ...prev.days.slice(0, ind),
              ...prev.days.slice(ind + 1, prev.days.length),
            ],
          };
        }
      } else if (prev && !prev.days) {
        return {
          ...prev,
          days: [day],
        };
      }
    });
  };

  return {
    newLive,
    onMediaUpload,
    onMediaDelete,
    onUpdateName,
    onUpdateDescription,
    isFreeUpdate,
    onCalorieUpdate,
    onDurationUpdate,
    onKeyChange,
    onLinkUpdate,
    onSlotUpdate,
    onSlotsAdd,
    onSlotsDelete,
    onDaysUpdate,
    onSlotSet,
  };
};
