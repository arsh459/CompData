import { cloud_name } from "@utils/cloudinary";

export interface AWSMedia {
  id: string;
  resource_type: "image" | "video";
  width?: number;
  height?: number;
  extension: string;
  filename: string;
  size: number;
  path: string;
  url: string;
  bucketName: string;
  region: string;
  remoteFileName: string;

  uploadedUnix: number;
  mediaType: "aws";

  duration?: number;
}

export interface CloudinaryMedia {
  access_mode: "public";
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  format: string;
  height: number;
  id: string;
  original_extension: string;
  original_filename: string;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: "image" | "video";
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: "upload";
  url: string;
  version: number;
  version_id: string;
  width: number;
  duration?: number;
}

export const cloudinaryBaseURL = `https://res.cloudinary.com/${cloud_name}`;
