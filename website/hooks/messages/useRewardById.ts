import { useEffect, useState } from "react";

import { db } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";

// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

import { Reminder, whatsappTemplates } from "@models/Reminder/Reminder";
import { createReminder } from "@models/Reminder/createUtils";
// import { createNewTask } from "@models/Tasks/createUtils";

export const useRewardById = (
  rewardId: string,
  gameId: string,
  isUrgent: boolean,
  templateId: whatsappTemplates,
  addlevelTaskObj?: boolean
) => {
  const [reward, setReward] = useState<Reminder>();

  // console.log("here", taskList);

  useEffect(() => {
    const getRemoteDoc = async () => {
      const ref = doc(db, "reminders", rewardId);

      const taskDoc = await getDoc(ref);
      const rewardObj = taskDoc.data();

      if (rewardObj) {
        setReward(rewardObj as Reminder);
      } else {
        setReward(
          createReminder(
            isUrgent,
            templateId,
            "",
            "",
            "",
            "",
            gameId,
            "",
            "",
            addlevelTaskObj
          )
        );
      }
    };

    getRemoteDoc();
  }, [rewardId, gameId, isUrgent, templateId, addlevelTaskObj]);

  return {
    reward,
    setReward,
  };
};
