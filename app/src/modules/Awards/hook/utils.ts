import firestore from "@react-native-firebase/firestore";

export const updateUserUnseenAwards = async (uid?: string) => {
  await firestore().collection("users").doc(uid).update({
    unseenAwards: [], // firestore.FieldValue.delete(),
  });
};

export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - 1 - start) / step + 1 },
    (value, index) => start + index * step
  );
