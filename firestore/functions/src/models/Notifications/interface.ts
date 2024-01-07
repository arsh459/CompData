export interface Notification {
  title: string;
  body: string;
  notificationType: NotficationType;
  imageURL?: string;
  seen: boolean;
  createdOn: number;
  openOnType?: NotificationOpenOnType;
  id?: string;
  notificationId: string;
}

export type NotificationOpenOnType =
  | "listing"
  | "stay"
  | "collection"
  | "trip"
  | "lead"
  | "booking"
  | "message";

export type NotficationType =
  | "view"
  | "booking"
  | "lead"
  | "earning"
  | "message";

export interface notifee {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  data: NotifeeData;
  android?: {
    [key: string]: object | string | number | boolean;
  };
  ios?: {
    [key: string]: object | string | number | boolean;
  };
}

export interface NotifeeData {
  notificationType: NotficationTypeV2;
  navigateTo: NavigationScreen;
  navigateToParams?: { [key: string]: string };
  imageUrl?: string;
  title: string;
  body: string;
  subtitle: string;
  id: string;

  uid: string;
  imgRounded?: boolean;
  createdOn: number;
}

export interface RemoteNotifeeData {
  notificationType?: NotficationTypeV2;
  navigateTo?: NavigationScreen;
  navigateToParams?: { [key: string]: string };
  imageUrl?: string;
  title?: string;
  body?: string;
  subtitle?: string;
  id?: string;

  uid?: string;

  badgeDay?: number;
  badgeId?: string;

  imgRounded?: boolean;
  createdOn?: number;
}

type NotficationTypeV2 = "text" | "image" | "message";
type NavigationScreen = string;

export type channelType = "push" | "wa";

export interface TemplateNotification {
  id: string;
  channel: channelType;
  templateName: string;

  pushParams?: RemoteNotifeeData;
  waParams?: { default: string }[];

  scheduleType: notificationScheduleType;
  cronTimeString?: string;
}

export type notificationScheduleType =
  | "onDemand"
  | "cron"
  | "onMemberAddCohort";
