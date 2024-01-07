import { db } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { sbEventPayment } from "./interface";
// import { sbEventPayment } from "pages/api/payments/utils/interface";

export const getPayment = async (uid: string, paymentId: string) => {
  const paymentRef = doc(doc(db, `users`, uid), "payments", paymentId);
  const docSnap = await getDoc(paymentRef);
  const data = docSnap.data() as sbEventPayment | undefined;
  return data;
};
