// import { UserInterface } from "@models/User/User";
import { Voucher } from "@models/Voucher/interface";
import { MyPurchases } from "./interface";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { ProductVariant } from "@modules/ShopMain/PurchaseFormMainV2/store/usePurchaseFormStore";

export const createNewMyPurchase = (
  voucher: Voucher,
  uid: string,
  name?: string,
  phone?: string,
  email?: string,
  profileImage?: AWSMedia | CloudinaryMedia
): MyPurchases => {
  return {
    voucherId: voucher.id,
    purchasedOn: Date.now(),
    name: voucher.name,
    value: voucher.value,
    ...(voucher.media ? { media: voucher.media } : {}),
    ...(voucher.rectMedia ? { rectMedia: voucher.rectMedia } : {}),
    uid: uid,
    purchaseId: uuidv4(),
    isRedeemed: "requested",
    user: {
      name: name ? name : "",
      phone: phone ? phone : "",
      email: email ? email : "",
      ...(profileImage ? { img: profileImage } : {}),
    },
  };
};

export const createNewMyPurchaseV2 = (
  voucher: Voucher,
  uid: string,
  name?: string,
  phone?: string,
  email?: string,
  profileImage?: AWSMedia | CloudinaryMedia,
  state?: string,
  city?: string,
  pincode?: string,
  fullAddress?: string,
  selectedProductVariant?: ProductVariant,
  // pass remaining values -- address ++
): MyPurchases => {
  return {
    voucherId: voucher.id,
    purchasedOn: Date.now(),
    name: voucher.name,
    value: voucher.value,
    ...(voucher.media ? { media: voucher.media } : {}),
    ...(voucher.rectMedia ? { rectMedia: voucher.rectMedia } : {}),
    uid: uid,
    purchaseId: uuidv4(),
    isRedeemed: "requested",
    user: {
      name: name ? name : "",
      phone: phone ? phone : "",
      email: email ? email : "",
      state: state ? state : "",
      city: city ? city : "",
      pincode: pincode ? pincode : "",
      fullAddress: fullAddress ? fullAddress : "",
      selectedProductVariant: selectedProductVariant ? selectedProductVariant : {id: "NA", name: "NA"},
      ...(profileImage ? { img: profileImage } : {}),
    },
  };
};
