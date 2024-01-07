import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { AdvertisementDoc } from "@models/AdvertisementDoc";

export const useAdvertisementDoc = () => {
  const { state } = useAuthContext();
  const [advertisementDoc, setAdvertisementDoc] = useState<AdvertisementDoc>();

  useEffect(() => {
    const list = firestore()
      .collection("sbEvents")
      .doc(state.gameId)
      .collection("advertisementDoc")
      .limit(1)
      .onSnapshot((advertisementDocs) => {
        if (advertisementDocs) {
          const remoteAdvertisementDocs: AdvertisementDoc[] = [];

          advertisementDocs.forEach((doc) => {
            if (doc) {
              const data = doc.data() as AdvertisementDoc;
              remoteAdvertisementDocs.push(data);
            }
          });

          if (remoteAdvertisementDocs.length) {
            setAdvertisementDoc(remoteAdvertisementDocs[0]);
          }
        }
      });

    return () => {
      list();
    };
  }, [state.gameId]);

  return { advertisementDoc };
};
