import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { AppConfiguration } from "@models/config/config";

export const useAppConfiguration = () => {
  const [config, setConfig] = useState<AppConfiguration>();
  useEffect(() => {
    firestore()
      .collection("config")
      .onSnapshot((doc) => {
        if (doc && doc?.docs && doc?.docs?.length) {
          setConfig(doc.docs[0].data() as AppConfiguration);
        }
      });
  }, []);

  return {
    config,
  };
};
