import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface Testimonial {
  id: string;
  submittedBy: string;
  media?: CloudinaryMedia | AWSMedia;
  name?: string;
  shortAchievement?: string;
  achievement?: string;
  quote?: string;

  isTransformation?: boolean;

  createdOn?: number;
  updatedOn?: number;
  isFemale?: boolean;

  gameName?: string;
  awardImage?: CloudinaryMedia | AWSMedia;
  awardName?: string;
  uid?: string;
  rating?: number;
  video?: CloudinaryMedia | AWSMedia;
  image?: CloudinaryMedia | AWSMedia;
  thumbnail?: CloudinaryMedia | AWSMedia;
  youtubeId?: string;

  priority?: number;
}
