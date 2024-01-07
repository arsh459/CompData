import { db } from "@config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateRegistrationValue = async (
  uid: string,
  registrationId: string,
  cohortId: string,
  cohortName: string
) => {
  if (cohortId && cohortName) {
    const userRef = doc(db, "users", uid);
    const regisRef = doc(userRef, "registrations", registrationId);

    await updateDoc(regisRef, {
      cohortId: cohortId,
      cohortName: cohortName,
    });
  }
};
