import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface Story {
  id: string;

  media?: CloudinaryMedia | AWSMedia;
  title?: string;
  text?: string;
  link?: string;
  priority?: number;
  createdOn?: number;
  updatedOn?: number;
}
