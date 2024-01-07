import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

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
  };
}
