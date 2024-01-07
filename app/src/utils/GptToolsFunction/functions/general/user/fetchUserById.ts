import { UserInterface } from "@models/User/User";
import firestore from "@react-native-firebase/firestore";
export const fetchUserById = async (uid: string) => {
  let taskDoc = await firestore().collection("users").doc(uid).get();

  if (taskDoc.data()) {
    return taskDoc.data() as UserInterface;
  }

  return undefined;
};
