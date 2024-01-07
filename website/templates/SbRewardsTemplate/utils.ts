import { db } from "@config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteVoucher = async (id?: string) => {
  if (id) {
    await deleteDoc(doc(db, "sbRewards", id));
  }
};
