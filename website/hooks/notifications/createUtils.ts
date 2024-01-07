import { v4 as uuidv4 } from "uuid";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";
import { TemplateNotification } from "@models/Notifications";

export const createNewTemplateNotification = (): TemplateNotification => {
  return {
    id: uuidv4(),
    templateName: "",
    channel: "wa",
    scheduleType: "onDemand",
  };
};

export const saveNewTemplateNotification = async (
  templateNotification: TemplateNotification
) => {
  const templateNotificationRef = doc(
    db,
    "notificationTemplates",
    templateNotification.id
  );
  await setDoc(
    templateNotificationRef,
    { ...templateNotification },
    { merge: true }
  );
};

export const deleteTemplateNotification = async (
  templateNotification: TemplateNotification
) => {
  const templateNotificationRef = doc(
    db,
    "notificationTemplates",
    templateNotification.id
  );
  await deleteDoc(templateNotificationRef);
};
