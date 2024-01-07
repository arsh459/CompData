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

export interface RemoteNotifeeData {
  notificationType?: NotficationTypeV2;
  navigateTo?: NavigationScreen;
  navigateToParams?: { [key: string]: string };
  imageUrl?: string;
  title?: string;
  body?: string;
  subtitle?: string;
  imgRounded?: boolean;

  badgeId?: string;
  badgeDay?: number;
}

export type channelType = "push" | "wa";
export type NotficationTypeV2 = "text" | "image" | "message";
export type NavigationScreen = "Home" | "BlogScreen" | "Upgrade";
