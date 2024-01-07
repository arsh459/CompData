import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface ScoreEntry {
  eventId: string;
  rank: number;
  id: string;

  location?: string;

  // to be updated via onUserUpdate
  img?: CloudinaryMedia;
  name?: string;
  userKey?: string;

  // to  be updated via onSbEventUpdate
  scoreKey: string;
  submissions: Submission[];

  updatedOnUnix: number;
}

export interface Submission {
  value?: number;
  media?: CloudinaryMedia;
  createdOnUnix: number;
}
