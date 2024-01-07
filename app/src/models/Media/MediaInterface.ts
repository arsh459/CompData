export interface MediaInterface {
  url: string;
  type:
    | "video"
    | "photo"
    | "googlePhoto"
    | "photoLocalURI"
    | "videoLocalURI"
    | "cloud_photo"
    | "cloud_video";
  transformations?: string[];
  dayLabel?: string;
  hidden?: boolean; // to hide from timeline

  // timeline elements
  timelineLabel?: string;
  timelineDescription?: string;

  thumbnail?: string;

  // cloud_photo | cloud_video
  cloudinaryUploadParams?: CloudinaryUploadParams;
}

export interface CloudinaryUploadParams {
  asset_id: string;
  public_id: string;
  format: string;
  resource_type: string;
  secure_url: string;
}
