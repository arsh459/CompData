import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export type mediaStyleTemplates = "post" | "story" | "live" | "whatsapp";

export interface CampaignPost {
  id: string;
  media: CloudinaryMedia[];
  caption: string;
  mediaStyle: mediaStyleTemplates;

  tags?: string;
  hashtags?: string;

  creatorId: string;
  eventId: string;
}
