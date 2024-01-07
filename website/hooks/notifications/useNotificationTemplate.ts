import { db } from "@config/firebase";
import {
  channelType,
  NavigationScreen,
  NotficationTypeV2,
  notificationScheduleType,
  TemplateNotification,
} from "@models/Notifications";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  createNewTemplateNotification,
  saveNewTemplateNotification,
} from "./createUtils";

export const useNotificationTemplate = (templateId?: string) => {
  const router = useRouter();
  const [notificationTemplate, setNotificationTemplate] =
    useState<TemplateNotification>(createNewTemplateNotification());

  useEffect(() => {
    const getTemplate = async () => {
      if (templateId) {
        const templateDoc = await getDoc(
          doc(db, "notificationTemplates", templateId)
        );

        if (templateDoc.data()) {
          setNotificationTemplate(templateDoc.data() as TemplateNotification);
        }
      }
    };

    getTemplate();
  }, [templateId]);

  const onSave = async () => {
    if (notificationTemplate.templateName !== "") {
      await saveNewTemplateNotification(notificationTemplate);
      router.back();
    }
  };

  const onUpdateTemplateName = async (newVal: string) => {
    setNotificationTemplate((prev) => ({ ...prev, templateName: newVal }));
  };

  const onUpdateChannel = async (newVal: channelType) => {
    setNotificationTemplate((prev) => ({ ...prev, channel: newVal }));
  };

  const onUpdateScheduleType = async (newVal: notificationScheduleType) => {
    setNotificationTemplate((prev) => ({ ...prev, scheduleType: newVal }));
  };

  const onAddWAParams = async (newVal: string) => {
    setNotificationTemplate((prev) => {
      const { waParams, ...rest } = prev;
      return {
        ...rest,
        waParams:
          waParams && waParams.length
            ? [...waParams, { default: newVal }]
            : [{ default: newVal }],
      };
    });
  };

  const onRemoveWAParams = async (target: string) => {
    setNotificationTemplate((prev) => {
      const { waParams, ...rest } = prev;
      const waParamsRemote = waParams?.filter(
        (each) => each.default !== target
      );
      return waParamsRemote && waParamsRemote.length
        ? { ...rest, waParams: waParamsRemote }
        : rest;
    });
  };

  const onUpdatePushParamsStringVal = (
    newVal: string | number,
    key: "imageUrl" | "title" | "body" | "subtitle" | "badgeId" | "badgeDay"
  ) => {
    setNotificationTemplate((prev) => {
      const { pushParams, ...rest } = prev;
      return pushParams
        ? { ...rest, pushParams: { ...pushParams, [key]: newVal } }
        : { ...rest, pushParams: { [key]: newVal } };
    });
  };

  const onUpdatePushParamsNotificationType = async (
    newVal: NotficationTypeV2
  ) => {
    setNotificationTemplate((prev) => {
      const { pushParams, ...rest } = prev;
      if (pushParams) {
        delete pushParams.imageUrl;
        delete pushParams.imgRounded;

        return {
          ...rest,
          pushParams: { ...pushParams, notificationType: newVal },
        };
      } else {
        return { ...rest, pushParams: { notificationType: newVal } };
      }
    });
  };

  const onUpdatePushParamsNavigateTo = async (newVal: NavigationScreen) => {
    setNotificationTemplate((prev) => {
      const { pushParams, ...rest } = prev;
      return pushParams
        ? { ...rest, pushParams: { ...pushParams, navigateTo: newVal } }
        : { ...rest, pushParams: { navigateTo: newVal } };
    });
  };

  const onAddPushParamsNavigateToParams = async (newVal: {
    [key: string]: string;
  }) => {
    setNotificationTemplate((prev) => {
      const { pushParams, ...prevRest } = prev;
      if (pushParams) {
        const { navigateToParams, ...pushParamsRest } = pushParams;
        return {
          ...prevRest,
          pushParams: {
            ...pushParamsRest,
            navigateToParams:
              navigateToParams && Object.keys(navigateToParams).length
                ? { ...navigateToParams, ...newVal }
                : newVal,
          },
        };
      } else {
        return {
          ...prevRest,
          pushParams: { navigateToParams: newVal },
        };
      }
    });
  };

  const onRemovePushParamsNavigateToParams = async (target: string) => {
    setNotificationTemplate((prev) => {
      const { pushParams, ...prevRest } = prev;
      if (pushParams) {
        const { navigateToParams, ...pushParamsRest } = pushParams;
        navigateToParams && delete navigateToParams[target];
        return navigateToParams && Object.keys(navigateToParams).length
          ? {
              ...prevRest,
              pushParams: { ...pushParamsRest, navigateToParams },
            }
          : { ...prevRest, pushParams: pushParamsRest };
      } else {
        return prevRest;
      }
    });
  };

  const onUpdatePushParamsImgRounded = (newVal: boolean) => {
    setNotificationTemplate((prev) => {
      const { pushParams, ...rest } = prev;
      return pushParams
        ? { ...rest, pushParams: { ...pushParams, imgRounded: newVal } }
        : { ...rest, pushParams: { imgRounded: newVal } };
    });
  };

  return {
    notificationTemplate,
    onSave,
    onUpdateTemplateName,
    onUpdateChannel,
    onUpdateScheduleType,
    onAddWAParams,
    onRemoveWAParams,
    onUpdatePushParamsStringVal,
    onUpdatePushParamsNotificationType,
    onUpdatePushParamsNavigateTo,
    onAddPushParamsNavigateToParams,
    onRemovePushParamsNavigateToParams,
    onUpdatePushParamsImgRounded,
  };
};
