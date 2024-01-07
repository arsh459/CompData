import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface AdvertisementDoc {
  id: string;
  createdOn: number;
  updatedOn: number;
  image?: CloudinaryMedia | AWSMedia;
  link: string;
}
