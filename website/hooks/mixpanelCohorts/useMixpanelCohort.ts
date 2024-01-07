import { db } from "@config/firebase";
import { MixPanelCohort } from "@models/mixpanel/mixpanelCohort";
import { TemplateNotification } from "@models/Notifications";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useMixpanelCohort = (id: string) => {
  const [cohort, setCohort] = useState<MixPanelCohort>();
  useEffect(() => {
    const getCohort = async () => {
      const remoteDoc = await getDoc(doc(db, "mixpanelCohorts", id));
      if (remoteDoc.data()) {
        setCohort(remoteDoc.data() as MixPanelCohort);
      }
    };

    id && getCohort();
  }, [id]);

  const toggleNotificationToCohort = (
    notification: TemplateNotification,
    action: "add" | "remove"
  ) => {
    setCohort((prev) => {
      if (notification.scheduleType === "onMemberAddCohort") {
        if (prev && action === "add") {
          return {
            ...prev,
            onAddNotification: notification.id,
          };
        } else if (prev && action === "remove") {
          return {
            ...prev,
            onAddNotification: "",
          };
        }
      } else if (notification.scheduleType === "cron") {
        if (prev && action === "add") {
          let newList: string[] = [];
          if (prev.onCronNotifications) {
            newList = prev.onCronNotifications;
          }

          // add new element
          newList.push(notification.id);

          const finalArray = Array.from(new Set(newList));

          return {
            ...prev,
            onCronNotifications: finalArray,
          };
        } else if (prev?.onCronNotifications && action === "remove") {
          const lstToChange = prev.onCronNotifications;
          return {
            ...prev,
            onCronNotifications: lstToChange.filter(
              (item) => item !== notification.id
            ),
          };
        }
      }

      return prev;
    });
  };

  const updateCohort = async () => {
    if (cohort) {
      await updateDoc(doc(db, "mixpanelCohorts", cohort?.cohortId), {
        ...cohort,
      });
    }
  };

  return {
    cohort,
    toggleNotificationToCohort,
    updateCohort,
  };
};
