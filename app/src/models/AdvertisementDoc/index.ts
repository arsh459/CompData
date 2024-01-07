import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export interface AdvertisementDoc {
  image: CloudinaryMedia | AWSMedia;
  link: string;
}
