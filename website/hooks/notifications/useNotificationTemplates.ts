import { db } from "@config/firebase";
import { TemplateNotification } from "@models/Notifications";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteTemplateNotification } from "./createUtils";

export const useNotificationTemplates = () => {
  const [notificationTemplates, setNotificationTemplates] = useState<
    TemplateNotification[]
  >([]);
  const [notificationTemplateMap, setNotificationTemplateMap] = useState<{
    [id: string]: TemplateNotification;
  }>({});

  useEffect(() => {
    const getTemplates = async () => {
      const templateDocs = await getDocs(
        collection(db, "notificationTemplates")
      );

      const remoteNots: TemplateNotification[] = [];
      const notMap: { [key: string]: TemplateNotification } = {};
      for (const templateDoc of templateDocs.docs) {
        const remoteDoc = templateDoc.data() as TemplateNotification;
        remoteNots.push(remoteDoc);
        notMap[remoteDoc.id] = remoteDoc;
      }

      setNotificationTemplateMap(notMap);
      setNotificationTemplates(remoteNots);
    };

    getTemplates();
  }, []);

  const onDelete = async (notificationTemplate: TemplateNotification) => {
    await deleteTemplateNotification(notificationTemplate);
    setNotificationTemplates((prev) =>
      prev.filter((each) => each !== notificationTemplate)
    );
    setNotificationTemplateMap((prev) => {
      const remoteNotificationTemplates = prev;
      delete remoteNotificationTemplates[notificationTemplate.id];
      return remoteNotificationTemplates;
    });
  };

  return {
    notificationTemplates,
    notificationTemplateMap,
    onDelete,
  };
};
