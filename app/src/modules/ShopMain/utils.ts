import { FilterVouchersQuery } from "@hooks/sbrewards/useSbRewards";
import firestore from "@react-native-firebase/firestore";
import { Voucher } from "@models/Voucher/interface";
import {
  createNewMyPurchase,
  createNewMyPurchaseV2,
} from "@models/MyPurchases/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { ProductVariant } from "./PurchaseFormMainV2/store/usePurchaseFormStore";

// Complete function @KRISHANU
export const onPurchaseNowV2 = async (
  uid: string,
  name: string,
  email: string,
  phoneNumber: string,
  state: string,
  city: string,
  pincode: string,
  fullAddress: string,
  voucher: Voucher,
  profileImage?: AWSMedia | CloudinaryMedia,
  selectedProductVariant?: ProductVariant
) => {
  const batch = firestore().batch();

  const newPurchase = createNewMyPurchaseV2(
    voucher,
    uid,
    name,
    phoneNumber,
    email,
    profileImage,
    state,
    city,
    pincode,
    fullAddress,
    selectedProductVariant
  );

  const purchaseRef = firestore()
    .collection("users")
    .doc(uid)
    .collection("myPurchases")
    .doc(newPurchase.purchaseId);

  batch.set(purchaseRef, newPurchase);

  const userRef = firestore().collection("users").doc(uid);

  batch.update(userRef, {
    fpDebit: firestore.FieldValue.increment(voucher.value),
    purchasedRewards: firestore.FieldValue.arrayUnion(voucher.id),
    lastPurchasedUnix: newPurchase.purchasedOn,
    city: city,
    state: state,
    pincode: pincode,
    fullAddress: fullAddress,
    // add city, state, pincode, fulladress
  });

  const rewardRef = firestore().collection("sbRewards").doc(voucher.id);

  batch.update(rewardRef, {
    itemLeft: firestore.FieldValue.increment(-1),
  });

  await batch.commit();
};

export const onPurchaseNow = async (
  uid?: string,

  voucher?: Voucher,
  user?: {
    name?: string;
    phone?: string;
    email?: string;
  },
  profileImage?: AWSMedia | CloudinaryMedia
) => {
  if (uid && voucher) {
    const batch = firestore().batch();
    // const uuid = uuidv4();
    // const purchasedOn = Date.now();

    const newPurchase = createNewMyPurchase(
      voucher,
      uid,
      user?.name,
      user?.phone,
      user?.email,
      profileImage
    );

    const purchaseRef = firestore()
      .collection("users")
      .doc(uid)
      .collection("myPurchases")
      .doc(newPurchase.purchaseId);

    batch.set(purchaseRef, newPurchase);

    const userRef = firestore().collection("users").doc(uid);

    batch.update(userRef, {
      fpDebit: firestore.FieldValue.increment(voucher.value),
      purchasedRewards: firestore.FieldValue.arrayUnion(voucher.id),
      lastPurchasedUnix: newPurchase.purchasedOn,
    });

    const rewardRef = firestore().collection("sbRewards").doc(voucher.id);

    batch.update(rewardRef, {
      itemLeft: firestore.FieldValue.increment(-1),
    });

    await batch.commit();
  }
};

export const isLocked = (
  userFp: number | undefined,
  voucherValue: number | undefined
) => {
  if (typeof userFp === "number" && typeof voucherValue === "number") {
    return {
      bool: userFp >= voucherValue,
      remaing: voucherValue - userFp,
    };
  }
  return {
    bool: false,
    remaing: 0,
  };
};

export interface FilterVoucherRadio {
  id: number;
  name: string;
  selected: boolean;
  query: FilterVouchersQuery;
}
