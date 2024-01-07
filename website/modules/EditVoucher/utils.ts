import { db } from "@config/firebase";
import { Voucher } from "@models/Voucher/interface";
import { doc, setDoc } from "firebase/firestore";

export const updateSbVoucher = async (voucher: Voucher) => {
  if (voucher) {
    await setDoc(doc(db, "sbRewards", voucher.id), voucher);
  }
};
