import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { ProductVariant } from "@modules/ShopMain/PurchaseFormMainV2/store/usePurchaseFormStore";

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
  // add product variants @KRISHANU
}
