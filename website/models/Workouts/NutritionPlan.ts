import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface NutritionPlan {
  id: string;

  name: string;
  description: string;
  media?: CloudinaryMedia;
  type: "nutrition";

  day: number;

  // creation details
  createdOnUnix: number;
  updatedOnUnix: number;

  // cost?: number;
  ownerUID: string;

  ingredients?: string;
  //   steps?: string;
  calories?: number;

  isFree: boolean;

  planKey: string;
}
