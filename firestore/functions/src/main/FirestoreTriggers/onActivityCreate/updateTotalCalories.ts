import * as admin from "firebase-admin";

export const addTotalCalories = async (uid: string, calories: number) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      totalCalories: admin.firestore.FieldValue.increment(calories),
    });
};

export const updateTotalCalories = async (
  uid: string,
  prevCalories: number,
  calories: number,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      totalCalories: admin.firestore.FieldValue.increment(
        calories - prevCalories,
      ),
    });
};
