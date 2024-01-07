import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export type redeemedProps = "pending" | "requested" | "redeemed";
export interface MyPurchase {
  voucherId: string;
  purchasedOn: number;
  name?: string;
  value?: number;
  media?: CloudinaryMedia | AWSMedia;
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

export interface ProductVariant {
  id: string;
  name: string;
}
