// export interface BaseNotification {
//   id: string;
//   title: string;
//   subtitle?: string;
//   body?: string;
//   data: NotifeeData;
// }

// export interface DeviceNotification extends BaseNotification {
//   android?: {
//     [key: string]: object | string | number | boolean;
//   };
//   ios?: {
//     [key: string]: object | string | number | boolean;
//   };
// }

// export interface NotificationToSave extends BaseNotification {
//   seen?: boolean;
//   imgRounded?: boolean;
//   createdOn: number;
// }

export interface NotifeeData {
  notificationType: NotficationTypeV2;
  navigateTo: NavigationScreen;
  navigateToParams?: { [key: string]: string };
  imageUrl?: string;
  title: string;
  body: string;
  subtitle: string;
  id: string;

  imgRounded?: boolean;
  createdOn: number;
  uid?: string;
}

export interface NotificationToSave extends NotifeeData {
  seen?: boolean;
}

export interface NotifeePassedData {
  navigateTo: string;
  navigateToParams?: { [key: string]: string };
  notificationType: NotficationTypeV2;
}

export type NotficationTypeV2 = "text" | "image" | "message";
export type NavigationScreen =
  | "Home"
  | "Ranking"
  | "Community"
  | "Journey"
  | "Shop";
