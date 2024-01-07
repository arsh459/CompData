import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export const getEarnedTaskQuerry = (
  uid: string,
  lastDoc?: FirebaseFirestoreTypes.DocumentData,
  source?: "task" | "steps" | "nutrition"
) => {
  if (source) {
    if (lastDoc) {
      return firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .where("source", "==", source)
        .orderBy("createdOn", "desc")
        .startAfter(lastDoc)
        .limit(5);
    } else {
      return firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .where("source", "==", source)
        .orderBy("createdOn", "desc")
        .limit(5);
    }
  } else {
    if (lastDoc) {
      return firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .orderBy("createdOn", "desc")
        .startAfter(lastDoc)
        .limit(5);
    } else {
      return firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .orderBy("createdOn", "desc")
        .limit(5);
    }
  }
};
