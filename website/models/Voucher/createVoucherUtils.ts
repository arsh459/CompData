import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "@config/firebase";
import { Voucher } from "./interface";

export const createNewVoucher = (uid: string): Voucher => {
  const now = Date.now();
  return {
    createdOn: now,
    updatedOn: now,
    submittedBy: uid,
    id: uuidv4(),
    name: "",
    description: "",
    priority: 0,
    itemLeft: 1,
    value: 0,
  };
};

export const saveNewVoucher = async (voucher: Voucher) => {
  const now = Date.now();
  const eventRef = doc(db, "sbRewards", voucher.id);
  await setDoc(eventRef, { ...voucher, updatedOn: now });
};
export const updateVoucher = async (voucher: Voucher) => {
  const now = Date.now();
  const eventRef = doc(db, "sbRewards", voucher.id);
  await updateDoc(eventRef, { ...voucher, updatedOn: now });
};
