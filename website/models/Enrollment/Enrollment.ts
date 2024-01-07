import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface Enrollment {
  id: string;
  eventId: string;
  cohortId: string;
  registrationId: string;

  // need to change with function
  eventName: string;
  eventMedia: CloudinaryMedia[];
  eventKey: string;

  // need to change with function
  creatorName: string;
  creatorKey: string;
  creatorProfileImg: CloudinaryMedia;

  createdOn: number;
}
