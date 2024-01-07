import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export interface ListItem {
  text: string;
  heading?: string;

  media?: CloudinaryMedia | AWSMedia;
  starts?: number;
  ends?: number;
  pointers?: string[];
  subtitle?: string;
  prizeLabel?: string;
  rank?: number;
  rankEnd?: number;
  coach?: boolean;
  worth?: number;
  linkObj?: { text: string; link: string };
  duration?: "weekly";
}
