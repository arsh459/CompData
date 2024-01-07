import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface Workout {
  id: string;

  name: string;
  description: string;
  media?: CloudinaryMedia | AWSMedia;
  videoKey: string;

  type?: "workout";

  calories?: number;
  day?: number;
  equipmentNeeded?: string;

  // creation details
  createdOnUnix: number;
  updatedOnUnix: number;
  ownerUID: string;

  // automated
  durationInSeconds?: number;

  isFree: boolean;
}
