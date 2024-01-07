import { firestore } from "firebase-admin";
import { PowerUpVariantsType } from "./powerUpInterface";
import { getTodayDate } from "../../main/FirestoreTriggers/onActivityUpdateV2/dateBucket";

// export const getUserPowerUps = async (uid: string) => {
//   const userPowerUpDocRef = firestore().doc(`users/${uid}/powerups/${uid}`);
//   const userPowerUp = (await userPowerUpDocRef.get()).data() as PowerUpType;

//   return { userPowerUp, userPowerUpDocRef };
// };

export const useUserPowerUps = async (
  uid: string,
  variants: PowerUpVariantsType,
  count: number,
  usertz: string,
) => {
  const today = getTodayDate(usertz);
  const availablePowerDocs = await firestore()
    .collection(`users/${uid}/powerup`)
    .where("type", "==", variants)
    .where("status", "==", "available")
    .limit(count)
    .get();

  if (availablePowerDocs.docs && availablePowerDocs.docs.length) {
    const batch = firestore().batch();
    for (const powerUpDoc of availablePowerDocs.docs) {
      const powerUpDocRef = powerUpDoc.ref;

      batch.update(powerUpDocRef, {
        status: "used",
        usedOn: today.todayUnix,
      });
    }
    await batch.commit();
    return true;
  }

  return false;
};
