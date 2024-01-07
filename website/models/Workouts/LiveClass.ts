import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface LiveClass {
  id: string;

  name: string;
  description: string;
  media?: CloudinaryMedia | AWSMedia;
  type: "live";

  day: number;

  // creation details
  createdOnUnix: number;
  updatedOnUnix: number;

  // cost?: number;
  ownerUID: string;
  link?: string;

  //   ingredients?: string;
  //   steps?: string;
  calories?: number;

  isFree: boolean;

  liveKey: string;

  duration?: number;
  slots?: string[]; // hh:mma string
  // allTimeLive?: boolean;
  days?: number[]; // js days
}
