import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export interface ListItemContent {
  image?: AWSMedia | CloudinaryMedia;
  text?: string;
  heading?: string;
  headingColor?: string;
  bgGradient?: string[];
  direction?: "image-top" | "image-left" | "image-right";
}

export interface SprintDetail {
  id: string;
  sprintId: string;
  howToWin: ListItemContent[];
  mainImage: AWSMedia | CloudinaryMedia;
  description: string;
}
// path for form
// admin/games/[gameId]/sprintDetails/[id]
