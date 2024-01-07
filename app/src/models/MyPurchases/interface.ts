import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { ProductVariant } from "@modules/ShopMain/PurchaseFormMainV2/store/usePurchaseFormStore";
import { redeemedProps } from "@modules/ShopMain/VoucherPurchaseMain/Stepper";

export interface MyPurchases {
  voucherId: string;
  purchasedOn: number;
  name?: string;
  value?: number;
  media?: CloudinaryMedia | AWSMedia;
  rectMedia?: CloudinaryMedia | AWSMedia;
  uid: string;
  purchaseId: string;
  isRedeemed: redeemedProps;
  user: {
    name?: string;
    phone?: string;
    email?: string;
    profileImage?: AWSMedia | CloudinaryMedia;

    state?: string;
    city?: string;
    pincode?: string;
    fullAddress?: string;
    selectedProductVariant?: ProductVariant;
  };
}
