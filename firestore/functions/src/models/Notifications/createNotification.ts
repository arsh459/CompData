import { UserInterface } from "../User/User";
import {
  NotficationType,
  NotifeeData,
  Notification,
  NotificationOpenOnType,
  RemoteNotifeeData,
} from "./interface";
import { v4 as uuid } from "uuid";

export const parseNotifeeData = (
  notData: RemoteNotifeeData,
  uid?: string,
): NotifeeData => {
  return {
    notificationType: notData.notificationType
      ? notData.notificationType
      : "text",
    uid: notData.uid ? notData.uid : uid ? uid : "",
    navigateTo: notData.navigateTo ? notData.navigateTo : "Home",
    navigateToParams: notData.navigateToParams ? notData.navigateToParams : {},
    imageUrl: notData.imageUrl ? notData.imageUrl : "",
    title: notData.title ? notData.title : "",
    body: notData.body ? notData.body : "",
    subtitle: notData.subtitle ? notData.subtitle : "",
    id: notData.id ? notData.id : uuid(),
    imgRounded: notData.imgRounded ? notData.imgRounded : false,
    createdOn: notData.createdOn ? notData.createdOn : Date.now(),
  };
};

export const createNotification = (
  title: string,
  body: string,
  notificationType: NotficationType,
  id: string,
  openOnType: NotificationOpenOnType,
  relatedUser?: UserInterface,
  imageURL?: string,
): Notification => {
  return {
    title: title,
    body: body,
    notificationType: notificationType,
    seen: false,
    createdOn: new Date().getTime(),
    ...(imageURL
      ? { imageURL: imageURL }
      : relatedUser &&
        relatedUser.imageURI && { imageURL: relatedUser.imageURI }),
    id: id,
    openOnType: openOnType,
    notificationId: uuid(),
  } as Notification;
};

export const createBookingNotification = (
  title: string,
  body: string,
  notificationType: NotficationType,
  id: string,
  openOnType: NotificationOpenOnType,
  imageURI?: string,
): Notification => {
  return {
    title: title,
    body: body,
    notificationType: notificationType,
    seen: false,
    createdOn: new Date().getTime(),
    ...(imageURI ? { imageURL: imageURI } : {}),
    id: id,
    openOnType: openOnType,
    notificationId: uuid(),
  } as Notification;
};
