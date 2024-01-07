import { CloudinaryMedia } from "../sbEvent/CloudinaryMedia";
import * as admin from "firebase-admin";

export interface WorkoutActivity {
  id: string;
  uid: string;
  streamedSeconds: number;
  date: string;
  streamLastStarted?: number;
  createdOn: number;
  updatedOn: number;

  type: "video" | "live" | "task";

  state?: "active" | "inactive";

  authorDetails: {
    name?: string;
    image?: CloudinaryMedia;
  };

  activityId?: string;
  points?: number;

  postRef?: admin.firestore.DocumentReference;
}

// workouts
////
