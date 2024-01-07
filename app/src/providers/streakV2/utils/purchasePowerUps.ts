import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { PowerUpType, PowerUpVariantsType } from "../interface";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export const purchasePowerUps = async (
  count: number,
  type: PowerUpVariantsType,
  uid?: string
) => {
  if (count <= 0) {
    return;
  }
  if (uid) {
    const batch = firestore().batch();
    const totalSpend = 10*count;
    const userRef:FirebaseFirestoreTypes.DocumentReference = firestore().doc(`users/${uid}`);
    for (let i = 0; i < count; i++) {
      // console.log("for loop");
      const powerUpData: PowerUpType = {
        id: uuidv4(),
        fpSpent: 10,
        purchasedOn: Date.now(),
        status: "available",
        type: type,
      };
      const powerUpRef: FirebaseFirestoreTypes.DocumentReference = firestore()
        .collection(`users/${uid}/powerup`)
        .doc(powerUpData.id);
      batch.set(powerUpRef, powerUpData);
      // await powerUpRef.set(powerUpData);
    }

    batch.update(userRef, { fpDebit: firestore.FieldValue.increment(totalSpend) });

    await batch.commit();
  }
};
