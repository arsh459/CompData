import { AWSMedia } from "@models/Media/cloudinaryUpload";

export interface AntStream {
  uid: string;
  createdOn: number;
  id: string;

  media: AWSMedia[];
}
