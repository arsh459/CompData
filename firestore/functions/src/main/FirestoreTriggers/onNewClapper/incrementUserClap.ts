import { updateOne } from "../../../utils/firestore/fetchOne";
import { firestore } from "firebase-admin";

export const incrementUserClaps = async (uid: string) => {
  await updateOne("users", uid, {
    numClaps: firestore.FieldValue.increment(1),
  });
};
