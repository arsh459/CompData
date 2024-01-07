import { useEffect, useState } from "react";

import { db } from "config/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";

// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

import { Reminder, whatsappTemplates } from "@models/Reminder/Reminder";
// import { createNewTask } from "@models/Tasks/createUtils";

export const useRewardReminders = (
  gameId: string,
  templateId: whatsappTemplates
) => {
  const [rewardList, setRewardList] = useState<Reminder[]>([]);

  // console.log("here", taskList);

  useEffect(() => {
    const ref = collection(db, "reminders");
    const q = query(
      ref,
      where("templateId", "==", templateId),
      where("parentId", "==", gameId)
    );

    const unsubscribe = onSnapshot(q, (taskDocs) => {
      const remoteTasks: Reminder[] = [];
      for (const taskDoc of taskDocs.docs) {
        remoteTasks.push(taskDoc.data() as Reminder);
      }
      setRewardList(remoteTasks);
    });

    return () => {
      unsubscribe();
    };
  }, [gameId, templateId]);

  return {
    rewardList,
  };
};
