import { db } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Registration } from "./Registrations";
// import { sbEventPayment } from "pages/api/payments/utils/interface";

export const getRegistration = async (uid: string, registrationId: string) => {
  const regRef = doc(doc(db, `users`, uid), "registrations", registrationId);
  const docSnap = await getDoc(regRef);
  const data = docSnap.data() as Registration | undefined;
  return data;
};
