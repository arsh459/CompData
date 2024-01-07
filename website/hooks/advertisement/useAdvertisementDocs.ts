import { useEffect, useState } from "react";
import { db } from "config/firebase";

import { onSnapshot, doc, collection } from "firebase/firestore";
import { AdvertisementDoc } from "@models/AdvertisementDoc";

export type tabs = "Coaches" | "Players" | "My Team";

export const useAdvertisementDocs = (eventId: string) => {
  const [advertisementDocs, setAdvertisementDocs] = useState<
    AdvertisementDoc[]
  >([]);

  useEffect(() => {
    if (eventId) {
      const advertisementDocsRef = collection(
        doc(db, "sbEvents", eventId),
        "advertisementDoc"
      );

      if (advertisementDocsRef) {
        const unsub = onSnapshot(advertisementDocsRef, (advertisementDocs) => {
          const remoteAdvertisementDocs: AdvertisementDoc[] = [];
          for (const advertisementDoc of advertisementDocs.docs) {
            const advertisementDocData =
              advertisementDoc.data() as AdvertisementDoc;
            remoteAdvertisementDocs.push(advertisementDocData);
          }

          setAdvertisementDocs(remoteAdvertisementDocs);
        });

        return () => {
          if (unsub) {
            unsub();
          }
        };
      }
    }
  }, [eventId]);

  return {
    advertisementDocs,
  };
};
