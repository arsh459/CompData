import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export type castState = "created" | "scanned" | "welcomed";
export type deviceStatus = "UNKNOWN" | "LIVE" | "DISCONNECTED" | "SETTING_UP";

export type taskState = "init" | "play" | "pause" | "finished";
export interface Cast {
  id: string;
  state: castState;
  webStatus?: deviceStatus;
  appStatus?: deviceStatus;
  taskPlaybackId?: string;
  userUID?: string;
  createdOn: number;
  taskName?: string;
  taskMedia?: CloudinaryMedia | AWSMedia;
  taskState?: taskState;
  activityId?: string;
}
