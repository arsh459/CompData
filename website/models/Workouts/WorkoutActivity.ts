import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { DocumentReference } from "firebase/firestore";

export interface WorkoutActivity {
  id: string;
  uid: string;
  streamedSeconds: number; // frontend seconds
  date: string;
  createdOn: number;

  currentReservoir?: number;
  reservoirSeconds?: number;

  streamLastStarted?: number; // update
  updatedOn: number;

  state?: "active" | "inactive";
  type: "video" | "live" | "task";

  authorDetails: {
    name?: string;
    image?: CloudinaryMedia | AWSMedia;
  };

  points?: number;
  activityId?: string;
  media?: (CloudinaryMedia | AWSMedia)[];

  postRef?: DocumentReference;
  // postId?: string;
}

export interface WorkoutActivitySelfie {
  id: string;
  img?: string;
  createdOn: number;
  updatedOn: number;
  uid: string;
}

// workouts
////
