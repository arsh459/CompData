import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { ProductVariant } from "@models/MyPurchases";

export interface Voucher {
  id: string;
  name: string;
  value: number;
  description: string;
  media?: CloudinaryMedia | AWSMedia;
  rectMedia?: CloudinaryMedia | AWSMedia;
  carouselMedia?: (CloudinaryMedia | AWSMedia)[];
  createdOn: number;
  updatedOn?: number;
  submittedBy: string;
  itemLeft: number;
  priority: number;

  productVariants?: ProductVariant[];
}
