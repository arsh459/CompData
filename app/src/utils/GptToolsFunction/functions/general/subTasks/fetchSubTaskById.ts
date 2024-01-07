import { SubTask } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";

const fetchSubTaskById = async (id: string) => {
  let doc = await firestore().collection("subTasks").doc(id).get();
  if (doc.data()) {
    return doc.data() as SubTask;
  }
  return undefined;
};

export default fetchSubTaskById;
