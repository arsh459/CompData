import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export type castState = "created" | "scanned" | "welcomed";
export type deviceStatus = "UNKNOWN" | "LIVE" | "DISCONNECTED" | "SETTING_UP";

export type taskState = "init" | "ready" | "play" | "pause" | "finished";
export interface Cast {
  id: string;
  taskPlaybackId?: string;
  state: castState;
  webStatus?: deviceStatus;
  appStatus?: deviceStatus;
  userUID?: string;
  createdOn: number;
  taskName?: string;
  taskMedia?: CloudinaryMedia | AWSMedia;
  taskState?: taskState;
  activityId?: string;
}
