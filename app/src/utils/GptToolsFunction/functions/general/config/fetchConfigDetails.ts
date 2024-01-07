import { AppConfiguration } from "@models/config/config";
import firestore from "@react-native-firebase/firestore";
export const fetchConfigDetails = async () => {
  let configDocs = await firestore().collection("config").get();

  if (configDocs && configDocs.docs && configDocs.docs.length) {
    return configDocs.docs[0].data() as AppConfiguration;
  }

  return undefined;
};
