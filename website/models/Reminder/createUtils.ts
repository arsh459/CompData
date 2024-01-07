import { Reminder, whatsappTemplates } from "./Reminder";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";

export const createReminder = (
  isUrgent: boolean,
  template: whatsappTemplates,
  communityId: string,
  authorId: string,
  positionName: string,
  rewardName: string,
  parentId: string,
  postId: string,
  taskId: string,
  addlevelTaskObj?: boolean,

  id?: string
): Reminder => {
  const now = Date.now();
  return {
    id: id ? id : uuidv4(),
    state: isUrgent ? "URGENT" : "PENDING",
    templateId: template,
    scheduledAt: now,

    createdOn: now,
    communityId,
    authorId,
    positionName,
    rewardName,
    parentId,
    postId,
    taskId,

    ...(addlevelTaskObj
      ? {
          levelTaskObj: {
            level0: "",
            level1: "",
            level2: "",
            level3: "",
            level4: "",
            level5: "",
          },
        }
      : {}),
  };
};

export const saveReminder = async (reminder: Reminder) => {
  await setDoc(doc(db, "reminders", reminder.id), reminder);
};
