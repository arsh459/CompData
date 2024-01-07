import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export interface Journey {
  id: string;
  media?: CloudinaryMedia | AWSMedia;
  currWeight?: number;
  displayOn: number;
  updatedOn: number;
  createdOn: number;
  text?: string;
}
