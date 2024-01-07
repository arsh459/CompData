type queueTaskStatus = "pending" | "completed" | "error";
import * as admin from "firebase-admin";

export interface LeaderboardUpdateTask {
  id: string;
  uid: string;
  levelId: string;
  timestamp: admin.firestore.Timestamp | admin.firestore.FieldValue;
  fp: number;
  status: queueTaskStatus;
  incTime?: number;
}
